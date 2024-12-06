export type WellnessCategory = 
  | 'Health Optimizers'
  | 'Balanced Lifestyle Seekers'
  | 'Fitness and Nutrition Beginners'
  | 'Stressed and Overwhelmed'
  | 'Health Restorers';

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'slider' | 'text';
  options?: {
    text: string;
    value: string;
    points: number;
    categories: WellnessCategory[];
  }[];
}

export interface UserSurveyResponse {
  userId: string;
  responses: {
    questionId: string;
    answer: string | string[];
  }[];
  category: WellnessCategory;
  timestamp: string;
}