import { sampleExercises } from '../data/sample-data';
import type { Exercise } from '../models/exercise.model';

export class ExerciseService {
  async getExercises(category?: string): Promise<Exercise[]> {
    let exercises = [...sampleExercises];
    
    if (category) {
      exercises = exercises.filter(e => e.category === category);
    }
    
    return exercises;
  }

  async searchExercises(term: string): Promise<Exercise[]> {
    const searchTerm = term.toLowerCase();
    return sampleExercises.filter(exercise => 
      exercise.name.toLowerCase().includes(searchTerm) ||
      exercise.muscleGroups.some(group => 
        group.toLowerCase().includes(searchTerm)
      )
    );
  }
}