import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (title: string) => Promise<void>;
  loading: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, loading }) => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    try {
      setSubmitting(true);
      await onAddTask(title.trim());
      setTitle('');
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <div className="flex-1 relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          disabled={loading || submitting}
          className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-200 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:bg-gray-50 disabled:text-gray-400 transition-all duration-200
                   shadow-sm hover:shadow-md"
        />
      </div>
      <button
        type="submit"
        disabled={!title.trim() || loading || submitting}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl
                 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
                 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105
                 flex items-center gap-2 font-medium"
      >
        <Plus size={20} />
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};