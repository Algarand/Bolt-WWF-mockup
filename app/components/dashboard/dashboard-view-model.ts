import { Observable } from '@nativescript/core';
import { WorkoutService, Workout } from '../../services/workout.service';

export class DashboardViewModel extends Observable {
  private workoutService: WorkoutService;
  private _recentWorkouts: Workout[] = [];
  private _todayCalories = 0;
  private _weeklyWorkouts = 0;

  constructor() {
    super();
    this.workoutService = new WorkoutService();
    this.loadDashboardData();
  }

  get recentWorkouts(): Workout[] {
    return this._recentWorkouts;
  }

  get todayCalories(): number {
    return this._todayCalories;
  }

  get weeklyWorkouts(): number {
    return this._weeklyWorkouts;
  }

  async loadDashboardData() {
    try {
      const userId = 'current-user-id'; // Replace with actual user ID
      const workouts = await this.workoutService.getUserWorkouts(userId);
      
      this._recentWorkouts = workouts.slice(-5);
      this.calculateStats(workouts);
      
      this.notifyPropertyChange('recentWorkouts', this._recentWorkouts);
      this.notifyPropertyChange('todayCalories', this._todayCalories);
      this.notifyPropertyChange('weeklyWorkouts', this._weeklyWorkouts);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }

  private calculateStats(workouts: Workout[]) {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    this._todayCalories = workouts
      .filter(w => w.date === today)
      .reduce((sum, w) => sum + w.calories, 0);

    this._weeklyWorkouts = workouts
      .filter(w => new Date(w.date) >= weekAgo)
      .length;
  }

  onStartWorkout() {
    // Navigate to workout creation page
    // Implementation pending
  }
}