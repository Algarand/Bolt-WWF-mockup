import { useDraggable } from '@dnd-kit/core';
import { Activity } from '../../types/calendar';

interface ActivityCardProps {
  activity: Activity;
  onComplete: () => void;
  onEdit: () => void;
}

export default function ActivityCard({ activity, onComplete, onEdit }: ActivityCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: activity.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const getCategoryColor = (category: Activity['category']) => {
    const colors = {
      cardio: 'bg-red-100 border-red-200',
      strength: 'bg-blue-100 border-blue-200',
      flexibility: 'bg-green-100 border-green-200',
      recreational: 'bg-yellow-100 border-yellow-200',
      mindfulness: 'bg-purple-100 border-purple-200',
      custom: 'bg-gray-100 border-gray-200',
    };
    return colors[category];
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 rounded-lg border ${getCategoryColor(activity.category)} cursor-move`}
      onDoubleClick={onEdit}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{activity.title}</h3>
        <input
          type="checkbox"
          checked={activity.completed}
          onChange={onComplete}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="mt-1 text-sm text-gray-600">
        {activity.duration} minutes
        {activity.intensity && (
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white">
            {activity.intensity}
          </span>
        )}
      </div>
      {activity.completed && (
        <div className="mt-2 h-1 bg-gray-200 rounded">
          <div className="h-full bg-green-500 rounded" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}