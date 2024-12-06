import { SurveyQuestion } from '../types/survey';

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'current-wellbeing',
    text: 'How would you rate your current well-being?',
    type: 'single',
    options: [
      {
        text: 'Excellent',
        value: 'excellent',
        points: 4,
        categories: ['Health Optimizers']
      },
      {
        text: 'Good',
        value: 'good',
        points: 3,
        categories: ['Balanced Lifestyle Seekers']
      },
      {
        text: 'Fair',
        value: 'fair',
        points: 2,
        categories: ['Fitness and Nutrition Beginners', 'Health Restorers']
      },
      {
        text: 'Poor',
        value: 'poor',
        points: 1,
        categories: ['Stressed and Overwhelmed', 'Health Restorers']
      }
    ]
  },
  {
    id: 'lifestyle-activity',
    text: 'How would you describe your lifestyle?',
    type: 'single',
    options: [
      {
        text: 'Highly active',
        value: 'highly-active',
        points: 4,
        categories: ['Health Optimizers']
      },
      {
        text: 'Moderately active',
        value: 'moderately-active',
        points: 3,
        categories: ['Balanced Lifestyle Seekers']
      },
      {
        text: 'Generally inactive',
        value: 'generally-inactive',
        points: 2,
        categories: ['Fitness and Nutrition Beginners']
      },
      {
        text: 'Mostly inactive',
        value: 'mostly-inactive',
        points: 1,
        categories: ['Stressed and Overwhelmed', 'Health Restorers']
      }
    ]
  },
  {
    id: 'health-goals',
    text: 'What are your primary health goals?',
    type: 'multiple',
    options: [
      {
        text: 'Physical fitness',
        value: 'physical-fitness',
        points: 4,
        categories: ['Health Optimizers']
      },
      {
        text: 'Healthier eating habits',
        value: 'healthy-eating',
        points: 3,
        categories: ['Balanced Lifestyle Seekers', 'Fitness and Nutrition Beginners']
      },
      {
        text: 'Mental clarity',
        value: 'mental-clarity',
        points: 2,
        categories: ['Stressed and Overwhelmed']
      },
      {
        text: 'Improving sleep',
        value: 'better-sleep',
        points: 3,
        categories: ['Balanced Lifestyle Seekers', 'Health Restorers']
      },
      {
        text: 'Positive mindset',
        value: 'positive-mindset',
        points: 3,
        categories: ['Balanced Lifestyle Seekers', 'Stressed and Overwhelmed']
      }
    ]
  },
  {
    id: 'challenges',
    text: 'What challenges hinder your wellness progress?',
    type: 'multiple',
    options: [
      {
        text: 'Lack of time',
        value: 'time-constraint',
        points: 2,
        categories: ['Stressed and Overwhelmed', 'Balanced Lifestyle Seekers']
      },
      {
        text: 'Limited knowledge',
        value: 'knowledge-gap',
        points: 3,
        categories: ['Fitness and Nutrition Beginners']
      },
      {
        text: 'Health conditions',
        value: 'health-issues',
        points: 4,
        categories: ['Health Restorers']
      },
      {
        text: 'Motivation',
        value: 'motivation',
        points: 2,
        categories: ['Fitness and Nutrition Beginners', 'Stressed and Overwhelmed']
      }
    ]
  },
  {
    id: 'motivation',
    text: 'How motivated are you towards wellness?',
    type: 'single',
    options: [
      {
        text: 'Highly motivated',
        value: 'highly-motivated',
        points: 4,
        categories: ['Health Optimizers']
      },
      {
        text: 'Interested but unsure',
        value: 'interested',
        points: 3,
        categories: ['Fitness and Nutrition Beginners']
      },
      {
        text: 'Occasionally motivated',
        value: 'occasional',
        points: 2,
        categories: ['Balanced Lifestyle Seekers', 'Stressed and Overwhelmed']
      },
      {
        text: 'Struggling',
        value: 'struggling',
        points: 1,
        categories: ['Stressed and Overwhelmed', 'Health Restorers']
      }
    ]
  },
  {
    id: 'time-commitment',
    text: 'How much time can you dedicate to wellness daily?',
    type: 'single',
    options: [
      {
        text: 'More than 2 hours',
        value: 'more-than-2-hours',
        points: 4,
        categories: ['Health Optimizers']
      },
      {
        text: '1–2 hours',
        value: '1-2-hours',
        points: 3,
        categories: ['Balanced Lifestyle Seekers']
      },
      {
        text: '30–60 minutes',
        value: '30-60-minutes',
        points: 2,
        categories: ['Fitness and Nutrition Beginners']
      },
      {
        text: 'Less than 30 minutes',
        value: 'less-than-30-minutes',
        points: 1,
        categories: ['Stressed and Overwhelmed']
      }
    ]
  },
  {
    id: 'stress-level',
    text: 'How would you rate your current stress level?',
    type: 'single',
    options: [
      {
        text: 'Very low',
        value: 'very-low',
        points: 4,
        categories: ['Health Optimizers', 'Balanced Lifestyle Seekers']
      },
      {
        text: 'Moderate',
        value: 'moderate',
        points: 3,
        categories: ['Fitness and Nutrition Beginners']
      },
      {
        text: 'High',
        value: 'high',
        points: 2,
        categories: ['Stressed and Overwhelmed']
      },
      {
        text: 'Very high',
        value: 'very-high',
        points: 1,
        categories: ['Stressed and Overwhelmed', 'Health Restorers']
      }
    ]
  },
  {
    id: 'sleep-quality',
    text: 'How would you rate your sleep quality?',
    type: 'single',
    options: [
      {
        text: 'Excellent',
        value: 'excellent-sleep',
        points: 4,
        categories: ['Health Optimizers']
      },
      {
        text: 'Good',
        value: 'good-sleep',
        points: 3,
        categories: ['Balanced Lifestyle Seekers']
      },
      {
        text: 'Fair',
        value: 'fair-sleep',
        points: 2,
        categories: ['Fitness and Nutrition Beginners']
      },
      {
        text: 'Poor',
        value: 'poor-sleep',
        points: 1,
        categories: ['Stressed and Overwhelmed', 'Health Restorers']
      }
    ]
  },
  {
    id: 'nutrition-habits',
    text: 'How would you describe your eating habits?',
    type: 'single',
    options: [
      {
        text: 'Very healthy and balanced',
        value: 'very-healthy',
        points: 4,
        categories: ['Health Optimizers']
      },
      {
        text: 'Mostly healthy',
        value: 'mostly-healthy',
        points: 3,
        categories: ['Balanced Lifestyle Seekers']
      },
      {
        text: 'Need improvement',
        value: 'needs-improvement',
        points: 2,
        categories: ['Fitness and Nutrition Beginners']
      },
      {
        text: 'Poor',
        value: 'poor-nutrition',
        points: 1,
        categories: ['Stressed and Overwhelmed', 'Health Restorers']
      }
    ]
  },
  {
    id: 'support-system',
    text: 'How strong is your wellness support system?',
    type: 'single',
    options: [
      {
        text: 'Very strong',
        value: 'very-strong',
        points: 4,
        categories: ['Health Optimizers']
      },
      {
        text: 'Adequate',
        value: 'adequate',
        points: 3,
        categories: ['Balanced Lifestyle Seekers']
      },
      {
        text: 'Limited',
        value: 'limited',
        points: 2,
        categories: ['Fitness and Nutrition Beginners']
      },
      {
        text: 'None',
        value: 'none',
        points: 1,
        categories: ['Stressed and Overwhelmed', 'Health Restorers']
      }
    ]
  }
];