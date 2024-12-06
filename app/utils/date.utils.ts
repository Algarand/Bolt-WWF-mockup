export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getDateRange(days: number): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return { start, end };
}

export function calculateStreak(workoutDates: string[]): number {
  if (!workoutDates.length) return 0;
  
  const sortedDates = workoutDates
    .map(date => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 1;
  let currentDate = sortedDates[0];

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    
    if (sortedDates[i].toDateString() === prevDate.toDateString()) {
      streak++;
      currentDate = sortedDates[i];
    } else {
      break;
    }
  }

  return streak;
}