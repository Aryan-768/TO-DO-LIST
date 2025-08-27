import { useState, useEffect } from 'react';
import { localStorageAPI, Task } from '../lib/localStorage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate async operation for consistent UX
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = localStorageAPI.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string) => {
    try {
      setError(null);
      const newTask = localStorageAPI.addTask(title);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add task';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      setError(null);
      const updatedTask = localStorageAPI.updateTask(id, { completed });
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.id === id ? updatedTask : task
        ));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      const success = localStorageAPI.deleteTask(id);
      if (success) {
        setTasks(prev => prev.filter(task => task.id !== id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    refetch: fetchTasks
  };
};