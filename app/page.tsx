'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { todoStorage, type Todo } from '@/lib/todo'

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setTodos(todoStorage.getTodos())
  }, [])

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const updatedTodos = todoStorage.addTodo(inputValue)
      setTodos(updatedTodos)
      setInputValue('')
    }
  }

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todoStorage.toggleTodo(id)
    setTodos(updatedTodos)
  }

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todoStorage.deleteTodo(id)
    setTodos(updatedTodos)
  }

  const handleClearCompleted = () => {
    const updatedTodos = todoStorage.clearCompleted()
    setTodos(updatedTodos)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  if (!isClient) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Simple Todo App</h1>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Simple Todo App</h1>
        <p className="text-gray-600">
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
        </p>
      </header>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={handleAddTodo}>
          Add Task
        </Button>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No tasks yet</p>
          <p className="text-sm mt-2">Add a task to get started!</p>
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-200 hover:shadow-sm transition-shadow"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span
                  className={`flex-1 text-gray-900 ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>

          {completedCount > 0 && (
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                {completedCount} {completedCount === 1 ? 'task' : 'tasks'} completed
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClearCompleted}
              >
                Clear Completed
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}