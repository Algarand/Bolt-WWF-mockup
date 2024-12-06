export interface User {
  id: string;
  email: string;
  displayName: string;
  profilePicture?: string;
  fitnessGoals?: {
    weeklyWorkouts: number;
    calorieTarget: number;
    weightGoal?: number;
  };
  preferences?: {
    notifications: boolean;
    shareProgress: boolean;
    units: 'metric' | 'imperial';
  };
}

export interface UserStats {
  totalWorkouts: number;
  totalCaloriesBurned: number;
  streakDays: number;
  lastWorkout?: Date;
}