import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

export default function CalendarHeader({
  currentDate,
  onDateChange,
  view,
  onViewChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onDateChange(subMonths(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button
          onClick={() => onDateChange(addMonths(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex space-x-2">
        {(['day', 'week', 'month'] as const).map((viewOption) => (
          <button
            key={viewOption}
            onClick={() => onViewChange(viewOption)}
            className={`px-4 py-2 rounded-md ${
              view === viewOption
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}