import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function SurveyResults() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.category) {
      navigate('/survey');
    }
  }, [user, navigate]);

  const getCategoryDescription = () => {
    switch (user?.category) {
      case 'Health Optimizers':
        return "You're dedicated to optimizing your health and fitness. We'll provide advanced strategies and precise tracking tools.";
      case 'Balanced Lifestyle Seekers':
        return "You're seeking harmony in all aspects of wellness. We'll help you maintain balance while achieving your goals.";
      case 'Fitness and Nutrition Beginners':
        return "You're at the start of your wellness journey. We'll guide you through the basics and help build healthy habits.";
      case 'Stressed and Overwhelmed':
        return "We'll focus on stress management and mental wellness, gradually introducing sustainable lifestyle changes.";
      case 'Health Restorers':
        return "We'll support your recovery journey with appropriate exercises and wellness strategies.";
      default:
        return "Let's start your wellness journey together!";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wellness Profile</h2>
            <div className="bg-indigo-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                {user?.category}
              </h3>
              <p className="text-indigo-700">{getCategoryDescription()}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}