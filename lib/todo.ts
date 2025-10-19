export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

const STORAGE_KEY = 'todos'

export const todoStorage = {
  getTodos(): Todo[] {
    if (typeof window === 'undefined') return []
    try {
      const item = window.localStorage.getItem(STORAGE_KEY)
      return item ? JSON.parse(item) : []
    } catch (error) {
      console.error('Error reading todos from localStorage:', error)
      return []
    }
  },

  saveTodos(todos: Todo[]): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (error) {
      console.error('Error saving todos to localStorage:', error)
    }
  },

  addTodo(text: string): Todo[] {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }
    const todos = this.getTodos()
    const updatedTodos = [...todos, newTodo]
    this.saveTodos(updatedTodos)
    return updatedTodos
  },

  toggleTodo(id: string): Todo[] {
    const todos = this.getTodos()
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    this.saveTodos(updatedTodos)
    return updatedTodos
  },

  deleteTodo(id: string): Todo[] {
    const todos = this.getTodos()
    const updatedTodos = todos.filter(todo => todo.id !== id)
    this.saveTodos(updatedTodos)
    return updatedTodos
  },

  clearCompleted(): Todo[] {
    const todos = this.getTodos()
    const updatedTodos = todos.filter(todo => !todo.completed)
    this.saveTodos(updatedTodos)
    return updatedTodos
  },
}