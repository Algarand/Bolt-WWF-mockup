export type ActivityCategory = 
  | 'cardio'
  | 'strength'
  | 'flexibility'
  | 'recreational'
  | 'mindfulness'
  | 'custom';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  duration: number; // in minutes
  intensity?: 'low' | 'medium' | 'high';
  completed?: boolean;
  date: string;
  userId: string;
  notes?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    days?: number[];
  };
}

export interface CalendarEntry {
  id: string;
  date: string;
  activities: Activity[];
  userId: string;
}