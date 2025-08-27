export type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

const STORAGE_KEY = 'taskflow_tasks';

export const localStorageAPI = {
  // Get all tasks from localStorage
  getTasks: (): Task[] => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error reading tasks from localStorage:', error);
      return [];
    }
  },

  // Save tasks to localStorage
  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  },

  // Add a new task
  addTask: (title: string): Task => {
    const tasks = localStorageAPI.getTasks();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    const updatedTasks = [newTask, ...tasks];
    localStorageAPI.saveTasks(updatedTasks);
    return newTask;
  },

  // Update a task
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'created_at'>>): Task | null => {
    const tasks = localStorageAPI.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return null;
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    tasks[taskIndex] = updatedTask;
    localStorageAPI.saveTasks(tasks);
    return updatedTask;
  },

  // Delete a task
  deleteTask: (id: string): boolean => {
    const tasks = localStorageAPI.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    localStorageAPI.saveTasks(filteredTasks);
    return true;
  },

  toggleTask: (id: string): Task | null => {
    const tasks = localStorageAPI.getTasks();
    const task = tasks.find(t => t.id === id);
    
    if (!task) return null;
    
    return localStorageAPI.updateTask(id, { completed: !task.completed });
  },
};