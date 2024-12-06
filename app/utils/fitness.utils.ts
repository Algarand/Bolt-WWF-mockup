export function calculateCaloriesBurned(
  exerciseType: string,
  duration: number,
  weight: number,
  intensity: 'low' | 'medium' | 'high'
): number {
  const MET = {
    walking: { low: 2.5, medium: 3.5, high: 4.5 },
    running: { low: 6, medium: 8, high: 10 },
    cycling: { low: 4, medium: 6, high: 8 },
    swimming: { low: 5, medium: 7, high: 9 },
    weightlifting: { low: 3, medium: 5, high: 7 }
  };

  const exercise = exerciseType.toLowerCase() as keyof typeof MET;
  const met = MET[exercise]?.[intensity] || 3;
  
  // Calories = MET × weight (kg) × duration (hours)
  return Math.round((met * weight * (duration / 60)));
}

export function calculateBMI(weight: number, height: number): number {
  // weight in kg, height in meters
  return Number((weight / (height * height)).toFixed(1));
}

export function getWorkoutIntensity(
  averageHeartRate: number,
  age: number
): 'low' | 'medium' | 'high' {
  const maxHR = 220 - age;
  const percentage = (averageHeartRate / maxHR) * 100;

  if (percentage < 64) return 'low';
  if (percentage < 76) return 'medium';
  return 'high';
}