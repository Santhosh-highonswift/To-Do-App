'use client'

import { useState } from 'react'
import TodoItem from './TodoItem'

interface Todo {
  id: string
  task: string
  description: string | null
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  is_completed: boolean
  created_at: string
}

interface TodoListProps {
  initialTodos: Todo[]
}

type Filter = 'all' | 'pending' | 'in-progress' | 'completed'

export default function TodoList({ initialTodos }: TodoListProps) {
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTodos = initialTodos.filter(todo => {
    if (filter === 'completed') return todo.status === 'completed'
    if (filter === 'in-progress') return todo.status === 'in-progress'
    if (filter === 'pending') return todo.status === 'pending'
    return true
  })

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('in-progress')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            filter === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            {filter === 'all' && 'No tasks yet. Add one above!'}
            {filter === 'completed' && 'No completed tasks'}
            {filter === 'in-progress' && 'No tasks in progress'}
            {filter === 'pending' && 'No pending tasks'}
          </p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  )
}