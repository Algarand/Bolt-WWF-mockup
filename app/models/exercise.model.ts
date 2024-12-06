export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance';
  muscleGroups: string[];
  equipment?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ExerciseSet {
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  notes?: string;
}