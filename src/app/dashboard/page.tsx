import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabaseServer';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) console.error('getSession error:', error);

  if (!session) redirect('/auth/login');

  const { data: todos, error: todosError } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (todosError) console.error('Error fetching todos:', todosError);

  const handleSignOut = async () => {
    'use server';
    const supabaseAction = await createClient();
    await supabaseAction.auth.signOut();
    redirect('/auth/login');
  };

  return (
    <DashboardClient
      initialTodos={todos || []}
      userEmail={session.user.email}
      handleSignOut={handleSignOut}
    />
  );
}
