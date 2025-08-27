import React from 'react';
import { CheckCircle, Clock, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ 
  totalTasks, 
  completedTasks, 
  pendingTasks 
}) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <ListTodo size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
            <p className="text-sm text-gray-500">Total Tasks</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{completedTasks}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Clock size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{pendingTasks}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{completionRate}%</p>
            <p className="text-sm text-gray-500">Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};