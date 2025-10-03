'use client'

import { useState } from 'react'
import TodoItem from './TodoItem'

interface Todo {
  id: string
  task: string
  is_completed: boolean
  created_at: string
}

interface TodoListProps {
  initialTodos: Todo[]
}

type Filter = 'all' | 'completed' | 'pending'

export default function TodoList({ initialTodos }: TodoListProps) {
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTodos = initialTodos.filter(todo => {
    if (filter === 'completed') return todo.is_completed
    if (filter === 'pending') return !todo.is_completed
    return true
  })

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded-md ${
            filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            {filter === 'all' ? 'No tasks yet. Add one above!' :
             filter === 'completed' ? 'No completed tasks' : 'No pending tasks'}
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

