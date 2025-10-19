'use client';

import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { fetchTasks, deleteTask, updateTask } from '../services/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  refreshTrigger?: number;
  onTaskUpdate?: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ refreshTrigger, onTaskUpdate }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from API
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reload tasks when refreshTrigger changes
  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  // Handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      if (onTaskUpdate) onTaskUpdate();
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  // Handle task completion toggle
  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      await updateTask(taskId, { completed });
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, completed } : task
        )
      );
      if (onTaskUpdate) onTaskUpdate();
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console