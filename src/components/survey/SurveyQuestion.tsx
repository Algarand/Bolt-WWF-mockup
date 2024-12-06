import { SurveyQuestion as SurveyQuestionType } from '../../types/survey';

interface SurveyQuestionProps {
  question: SurveyQuestionType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export default function SurveyQuestion({ question, value, onChange }: SurveyQuestionProps) {
  if (question.type === 'single') {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-900">{question.text}</p>
        <div className="space-y-2">
          {question.options?.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'multiple') {
    const selectedValues = Array.isArray(value) ? value : [];
    
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-900">{question.text}</p>
        <div className="space-y-2">
          {question.options?.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...selectedValues, option.value]
                    : selectedValues.filter(v => v !== option.value);
                  onChange(newValue);
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return null;
}