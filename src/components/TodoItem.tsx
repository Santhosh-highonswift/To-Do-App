'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

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

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(todo.is_completed)
  const [status, setStatus] = useState(todo.status)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(todo.task)
  const [editedDescription, setEditedDescription] = useState(todo.description || '')
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleToggleComplete = async () => {
    try {
      const newCompletedState = !isCompleted
      const newStatus = newCompletedState ? 'completed' : 'pending'
      
      setIsCompleted(newCompletedState)
      setStatus(newStatus)

      const { error } = await supabase
        .from('todos')
        .update({ 
          is_completed: newCompletedState,
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', todo.id)

      if (error) throw error
      router.refresh() 
    } catch (error) {
      console.error('Error updating todo:', error)
      setIsCompleted(!isCompleted)
      setStatus(todo.status)
    }
  }

  const handleStatusChange = async (newStatus: 'pending' | 'in-progress' | 'completed') => {
    try {
      setStatus(newStatus)
      setIsCompleted(newStatus === 'completed')

      const { error } = await supabase
        .from('todos')
        .update({ 
          status: newStatus,
          is_completed: newStatus === 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', todo.id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error('Error updating status:', error)
      setStatus(todo.status)
      setIsCompleted(todo.is_completed)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedTask(todo.task)
    setEditedDescription(todo.description || '')
  }

  const handleUpdate = async () => {
    if (!editedTask.trim()) return

    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from('todos')
        .update({ 
          task: editedTask.trim(),
          description: editedDescription.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', todo.id)

      if (error) throw error
      
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error('Error updating todo:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedTask(todo.task)
    setEditedDescription(todo.description || '')
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todo.id)

      if (error) throw error
      router.refresh() 
    } catch (error) {
      console.error('Error deleting todo:', error)
      setIsDeleting(false) 
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString()
  }

  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !isCompleted

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg border border-blue-300 p-4 shadow-sm">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm text-black"
              placeholder="Enter task title"
              disabled={isUpdating}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm resize-none text-black"
              placeholder="Add description"
              disabled={isUpdating}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
                {status.replace('-', ' ')}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating || !editedTask.trim()}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg border p-4 transition-all duration-200 ${
      isCompleted ? 'opacity-75' : ''
    } ${isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleComplete}
            className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400 mt-1 cursor-pointer"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.task}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
            </div>
            
            {todo.description && (
              <p className={`text-sm text-gray-600 mb-2 ${isCompleted ? 'line-through' : ''}`}>
                {todo.description}
              </p>
            )}

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className={`px-2 py-1 rounded-full border ${getStatusColor(status)}`}>
                {status.replace('-', ' ')}
              </span>
              
          Due Date - {todo.due_date && (
                <span className={`flex items-center space-x-1 ${
                  isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'
                }`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(todo.due_date)} {isOverdue && '(Overdue)'}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4 ">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as 'pending' | 'in-progress' | 'completed')}
            className="text-xs text-gray-600 border border-gray-300 rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 cursor-pointer"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <button
            onClick={handleEdit}
            disabled={isDeleting}
            className="text-blue-500 hover:text-blue-700 disabled:opacity-50 p-1 rounded cursor-pointer transition-colors"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 disabled:opacity-50 p-1 rounded cursor-pointer transition-colors"
            title="Delete task"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}