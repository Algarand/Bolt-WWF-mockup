import { sampleWorkouts } from '../data/sample-data';
import type { Workout } from '../models/exercise.model';

export class WorkoutService {
  private workouts = [...sampleWorkouts];

  async addWorkout(workout: Workout): Promise<void> {
    this.workouts.push(workout);
    console.log('Workout added:', workout);
  }

  async getUserWorkouts(userId: string): Promise<Workout[]> {
    return this.workouts.filter(w => w.userId === userId);
  }

  async getRecentWorkouts(userId: string, limit: number = 5): Promise<Workout[]> {
    return this.workouts
      .filter(w => w.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
}