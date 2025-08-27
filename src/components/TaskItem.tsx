import React, { useState } from 'react';
import { Check, Trash2, RotateCcw } from 'lucide-react';
import { Task } from '../lib/supabase.ts';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    if (toggling) return;
    try {
      setToggling(true);
      await onToggle(task.id, !task.completed);
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    if (deleting) return;
    try {
      setDeleting(true);
      await onDelete(task.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200
                    border border-gray-100 p-4 transform hover:scale-[1.02]
                    ${task.completed ? 'bg-gray-50 border-gray-200' : ''}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200
                     flex items-center justify-center hover:scale-110
                     ${task.completed 
                       ? 'bg-green-500 border-green-500 text-white' 
                       : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                     }`}
        >
          {task.completed && !toggling && <Check size={14} />}
          {toggling && <RotateCcw size={14} className="animate-spin" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`text-lg transition-all duration-200 ${
            task.completed 
              ? 'text-gray-500 line-through' 
              : 'text-gray-800'
          }`}>
            {task.title}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {new Date(task.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-all duration-200
                   hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100
                   disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
        >
          <Trash2 size={18} className={deleting ? 'animate-pulse' : ''} />
        </button>
      </div>
    </div>
  );
};