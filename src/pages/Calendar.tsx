import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import CalendarHeader from '../components/calendar/CalendarHeader';
import ActivityCard from '../components/calendar/ActivityCard';
import AddActivityModal from '../components/calendar/AddActivityModal';
import { Activity } from '../types/calendar';
import { useAuthStore } from '../store/authStore';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const { user } = useAuthStore();

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Morning Run',
      category: 'cardio',
      duration: 30,
      intensity: 'medium',
      date: format(new Date(), 'yyyy-MM-dd'),
      userId: user?.id || '',
      completed: false,
    },
    // Add more sample activities here
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activityId = active.id as string;
    const newDate = over.id as string;

    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId ? { ...activity, date: newDate } : activity
      )
    );
  };

  const handleAddActivity = (activity: Omit<Activity, 'id' | 'userId'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Math.random().toString(),
      userId: user?.id || '',
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const handleCompleteActivity = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const getDaysInView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  return (
    <div className="h-full bg-gray-50">
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        view={view}
        onViewChange={setView}
      />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-4">
            {getDaysInView().map((date) => {
              const dateStr = format(date, 'yyyy-MM-dd');
              const dayActivities = activities.filter(
                (activity) => activity.date === dateStr
              );

              return (
                <div
                  key={dateStr}
                  className="min-h-[200px] bg-white rounded-lg shadow p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">
                      {format(date, 'MMM d')}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setIsAddModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      +
                    </button>
                  </div>

                  <div className="space-y-2">
                    {dayActivities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onComplete={() => handleCompleteActivity(activity.id)}
                        onEdit={() => {
                          // Handle edit
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DndContext>

      <AddActivityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddActivity}
        date={selectedDate}
      />
    </div>
  );
}