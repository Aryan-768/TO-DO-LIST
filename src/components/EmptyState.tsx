import React from 'react';
import { CheckSquare, Sparkles } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="relative inline-block">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full mb-6">
          <CheckSquare size={64} className="text-blue-400" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Sparkles size={24} className="text-yellow-400 animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-700 mb-4">
        No tasks yet!
      </h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Start by adding your first task above. Stay organized and get things done! ✨
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          Add tasks
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          Mark complete
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          Delete tasks
        </div>
      </div>
    </div>
  );
};