
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabaseServer';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';

export default async function DashboardPage() {
  console.log('>>> DashboardPage running');
  const supabase = await createClient();

  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('DashboardPage getSession error:', error);
  }
  console.log('DashboardPage - Session:', session ? `User logged in (${session.user.email})` : 'No user session');

  if (!session) {
    console.log('DashboardPage - No session found, redirecting to login.');
    redirect('/auth/login');
  }

  const { data: todos, error: todosError } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (todosError) {
    console.error('Error fetching todos:', todosError);
  }

  const handleSignOut = async () => {
    'use server';
    const supabaseAction = await createClient();
    await supabaseAction.auth.signOut();
    redirect('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Todo List</h1>
            {session.user.email && (
              <p className="text-gray-600 mt-1">Welcome, {session.user.email}</p>
            )}
          </div>
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
  );
}