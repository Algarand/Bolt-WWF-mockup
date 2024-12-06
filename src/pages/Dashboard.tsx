import { useState } from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import WorkoutChart from '../components/dashboard/WorkoutChart';
import { sampleWorkoutData } from '../data/sampleData';

export default function Dashboard() {
  const [workouts] = useState(sampleWorkoutData);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Workouts"
          value={workouts.length.toString()}
          trend="+5% vs last week"
        />
        <StatsCard
          title="Active Minutes"
          value="320"
          trend="+12% vs last week"
        />
        <StatsCard
          title="Calories Burned"
          value="2,450"
          trend="+8% vs last week"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Workout Progress</h2>
        <WorkoutChart data={workouts} />
      </div>
    </div>
  );
}