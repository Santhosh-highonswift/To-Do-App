'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'

interface Todo {
  id: string
  task: string
  is_completed: boolean
  created_at: string
}

interface DashboardClientProps {
  initialTodos: Todo[]
  userEmail: string | undefined
}

export default function DashboardClient({ initialTodos, userEmail }: DashboardClientProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* The sign-out button is now handled by the form action in the parent Server Component */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Todo List</h1>
            {userEmail && (
              <p className="text-gray-600 mt-1">Welcome, {userEmail}</p>
            )}
          </div>
          {/* The button for sign out is rendered by the Server Component, wrapped in a form */}
        </div>

        <AddTodo />
        <TodoList initialTodos={initialTodos} />
      </div>
    </div>
  )
}