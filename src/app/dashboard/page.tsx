import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'

export default async function DashboardPage() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching todos:', error)
  }

  const handleSignOut = async () => {
    'use server'
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Todo List</h1>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Sign Out
            </button>
          </form>
        </div>

        <AddTodo />
        <TodoList initialTodos={todos || []} />
      </div>
    </div>
  )
}