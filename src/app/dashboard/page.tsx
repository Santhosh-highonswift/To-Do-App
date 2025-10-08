import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabaseServer';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Use getUser() instead of getSession() to avoid the warning
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('getUser error:', userError);
  }

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch todos using the server client directly
  const { data: todos, error: todosError } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
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
    <DashboardClient
      initialTodos={todos || []}
      userEmail={user.email}
      handleSignOut={handleSignOut}
    />
  );
}