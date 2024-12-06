import { supabase } from '../lib/supabase';
import { Activity, CalendarEntry } from '../types/calendar';

export class CalendarService {
  async getActivities(userId: string, startDate: string, endDate: string): Promise<Activity[]> {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) throw error;
    return data || [];
  }

  async addActivity(activity: Omit<Activity, 'id'>): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .insert([activity])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateActivity(id: string, updates: Partial<Activity>): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteActivity(id: string): Promise<void> {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getCalendarEntries(userId: string, month: string): Promise<CalendarEntry[]> {
    const { data, error } = await supabase
      .from('calendar_entries')
      .select('*, activities(*)')
      .eq('user_id', userId)
      .like('date', `${month}%`);

    if (error) throw error;
    return data || [];
  }
}

export const calendarService = new CalendarService();