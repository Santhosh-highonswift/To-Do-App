'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Todo {
  id: string
  task: string
  is_completed: boolean
  created_at: string
}

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(todo.is_completed)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggleComplete = async () => {
    try {
      const newCompletedState = !isCompleted
      setIsCompleted(newCompletedState)

      const { error } = await supabase
        .from('todos')
        .update({ is_completed: newCompletedState })
        .eq('id', todo.id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating todo:', error)
      setIsCompleted(!isCompleted)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todo.id)

      if (error) throw error
      window.location.reload()
    } catch (error) {
      console.error('Error deleting todo:', error)
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow border">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggleComplete}
          className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
        />
        <span className={`${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.task}
        </span>
      </div>
      
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-700 disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}