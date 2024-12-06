import React from 'react';
import { useAuthStore } from '../../store/authStore';

export default function ProfileHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
        {user?.name.charAt(0)}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
        <p className="text-gray-500">{user?.email}</p>
        {user?.category && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-2">
            {user.category}
          </span>
        )}
      </div>
    </div>
  );
}