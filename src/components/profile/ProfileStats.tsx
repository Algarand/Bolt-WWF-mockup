import React from 'react';

interface ProfileStatsProps {
  stats: {
    workouts: number;
    calories: number;
    streak: number;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-indigo-600">{stats.workouts}</p>
        <p className="text-sm text-gray-500">Workouts</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-indigo-600">{stats.calories}</p>
        <p className="text-sm text-gray-500">Calories</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-indigo-600">{stats.streak}</p>
        <p className="text-sm text-gray-500">Day Streak</p>
      </div>
    </div>
  );
}