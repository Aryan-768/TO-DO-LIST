import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <Loader2 size={48} className="text-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Loading your tasks...</p>
      </div>
    </div>
  );
};