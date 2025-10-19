import React, { useState, useEffect, useCallback } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';
import { api } from '../services/api';
import { Task, FilterOptions } from '../types';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOptions>({
    status: 'all',
    search: ''
  });

  // Fetch tasks on component mount and when filter changes
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getTasks(filter);
      setTasks(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle task creation
  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const response = await api.createTask(taskData);
      setTasks(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  // Handle task updates
  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const response = await api.updateTask(id, updates);
      setTasks(prev => 
        prev.map(task => task.id === id ? response.data : task)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilter: Partial<FilterOptions>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
        </header>

        {/* Error Alert */}
        {error && (
          <div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
            role="alert"
          >
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Task Form */}
        <section className="mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Task
            </h2>
            <TaskForm onSubmit={handleCreateTask} />
          </div>
        </section>

        {/* Filter Bar */}
        <section className="mb-6">
          <FilterBar 
            filter={filter} 
            onFilterChange={handleFilterChange} 
          />
        </section>

        {/* Task List */}
        <main>
          <div className="bg-white shadow rounded-lg">
            {loading ? (
              <div className="p-8 text-center">
                <div 
                  className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                  role="status"
                  aria-label="Loading"
                />
                <p className="mt-2 text-gray-600">Loading tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No tasks found</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </main>

        {/* Stats Footer */}
        <footer className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {tasks.filter(t => t.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {tasks.filter(t => t.status === 'in-progress').length}
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}