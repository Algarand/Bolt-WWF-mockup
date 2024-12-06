import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
}

export default function StatsCard({ title, value, trend }: StatsCardProps) {
  const isPositive = trend.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
          )}
          <span className="ml-1">{trend}</span>
        </p>
      </div>
    </div>
  );
}