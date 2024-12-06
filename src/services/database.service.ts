import { supabase } from '../lib/supabase';
import { WellnessCategory } from '../types/survey';
import { Workout } from '../types/workout';

export class DatabaseService {
  async createUser(email: string, name: string) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, name }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUserCategory(userId: string, category: WellnessCategory) {
    const { error } = await supabase
      .from('users')
      .update({ category })
      .eq('id', userId);

    if (error) throw error;
  }

  async saveSurveyResponses(userId: string, responses: Record<string, unknown>, category: WellnessCategory) {
    const { error } = await supabase
      .from('survey_responses')
      .insert([{
        user_id: userId,
        responses,
        category
      }]);

    if (error) throw error;
  }

  async getWorkouts(userId: string): Promise<Workout[]> {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  }

  async addWorkout(workout: Omit<Workout, 'id'> & { user_id: string }) {
    const { data, error } = await supabase
      .from('workouts')
      .insert([workout])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}

export const dbService = new DatabaseService();