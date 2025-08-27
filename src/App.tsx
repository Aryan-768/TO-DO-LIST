// import React from 'react';
import { CheckSquare, AlertCircle } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskInput } from './components/TaskInput';
import { TaskItem } from './components/TaskItem';
import { TaskStats } from './components/TaskStats';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { tasks, loading, error, addTask, toggleTask, deleteTask } = useTasks();

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <CheckSquare size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Stay organized and get things done efficiently • Data saved locally
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

  <TaskInput onAddTask={async (title) => { await addTask(title); }} loading={loading} />

        {tasks.length > 0 && (
          <TaskStats 
            totalTasks={tasks.length}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
          />
        )}

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {pendingTasks > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    Pending Tasks ({pendingTasks})
                  </h2>
                  <div className="space-y-3">
                    {tasks
                      .filter(task => !task.completed)
                      .map(task => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onToggle={toggleTask}
                          onDelete={deleteTask}
                        />
                      ))}
                  </div>
                </div>
              )}

              {completedTasks > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    Completed Tasks ({completedTasks})
                  </h2>
                  <div className="space-y-3">
                    {tasks
                      .filter(task => task.completed)
                      .map(task => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onToggle={toggleTask}
                          onDelete={deleteTask}
                        />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;