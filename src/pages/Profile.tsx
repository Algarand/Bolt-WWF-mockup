import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import { dbService } from '../services/database.service';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [stats, setStats] = useState({
    workouts: 0,
    calories: 0,
    streak: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      if (user) {
        const workouts = await dbService.getWorkouts(user.id);
        setStats({
          workouts: workouts.length,
          calories: workouts.reduce((sum, w) => sum + w.calories, 0),
          streak: calculateStreak(workouts)
        });
      }
    };

    loadStats();
  }, [user]);

  const calculateStreak = (workouts: any[]) => {
    // Simple streak calculation - can be enhanced
    return workouts.length > 0 ? Math.min(workouts.length, 7) : 0;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader />
      <ProfileStats stats={stats} />

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/survey')}
            className="w-full text-left px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Retake Wellness Survey
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 border rounded-md text-red-600 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}