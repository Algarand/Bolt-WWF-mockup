import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { surveyQuestions } from '../data/surveyQuestions';
import SurveyQuestion from '../components/survey/SurveyQuestion';
import { WellnessCategory } from '../types/survey';
import { useAuthStore } from '../store/authStore';

export default function Survey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const { updateUserCategory } = useAuthStore();

  const calculateCategory = (): WellnessCategory => {
    const categoryScores: Record<WellnessCategory, number> = {
      'Health Optimizers': 0,
      'Balanced Lifestyle Seekers': 0,
      'Fitness and Nutrition Beginners': 0,
      'Stressed and Overwhelmed': 0,
      'Health Restorers': 0
    };

    Object.entries(responses).forEach(([questionId, answer]) => {
      const question = surveyQuestions.find(q => q.id === questionId);
      if (!question) return;

      if (Array.isArray(answer)) {
        answer.forEach(value => {
          const option = question.options?.find(opt => opt.value === value);
          if (option) {
            option.categories.forEach(category => {
              categoryScores[category] += option.points;
            });
          }
        });
      } else {
        const option = question.options?.find(opt => opt.value === answer);
        if (option) {
          option.categories.forEach(category => {
            categoryScores[category] += option.points;
          });
        }
      }
    });

    return Object.entries(categoryScores).reduce((a, b) => 
      categoryScores[a] > categoryScores[b[0]] ? a : b[0]
    ) as WellnessCategory;
  };

  const handleNext = () => {
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const category = calculateCategory();
      updateUserCategory(category);
      navigate('/survey-results');
    }
  };

  const currentQuestion = surveyQuestions[currentStep];
  const canProceed = responses[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Wellness Survey</h2>
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {surveyQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / surveyQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <SurveyQuestion
            question={currentQuestion}
            value={responses[currentQuestion.id] || ''}
            onChange={(value) => setResponses(prev => ({
              ...prev,
              [currentQuestion.id]: value
            }))}
          />

          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`${
                canProceed
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white px-4 py-2 rounded-md ml-auto`}
            >
              {currentStep === surveyQuestions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}