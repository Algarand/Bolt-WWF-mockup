export const sampleUsers = [
  {
    id: 'user1',
    email: 'demo@wellwisefit.com',
    displayName: 'Demo User',
    fitnessGoals: {
      weeklyWorkouts: 4,
      calorieTarget: 2000,
      weightGoal: 70
    }
  }
];

export const sampleWorkouts = [
  {
    id: 'workout1',
    userId: 'user1',
    type: 'Strength Training',
    duration: 45,
    calories: 320,
    date: new Date().toISOString().split('T')[0],
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 12 },
      { name: 'Squats', sets: 4, reps: 15 }
    ]
  },
  {
    id: 'workout2',
    userId: 'user1',
    type: 'Cardio',
    duration: 30,
    calories: 250,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    exercises: [
      { name: 'Running', sets: 1, reps: 1, duration: 30 }
    ]
  }
];

export const sampleExercises = [
  {
    id: 'ex1',
    name: 'Push-ups',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    difficulty: 'beginner'
  },
  {
    id: 'ex2',
    name: 'Squats',
    category: 'strength',
    muscleGroups: ['legs', 'glutes'],
    difficulty: 'beginner'
  },
  {
    id: 'ex3',
    name: 'Running',
    category: 'cardio',
    muscleGroups: ['legs', 'cardiovascular'],
    difficulty: 'intermediate'
  }
] as const;