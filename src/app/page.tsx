
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'

export default async function HomePage() {
    console.log('>>> HomePage running');
  const supabase = await createClient() 

  // --- ADD THESE LOGS (inside the function body) ---
  console.log('Supabase client object in HomePage:', supabase);
  if (supabase && typeof supabase.auth === 'undefined') {
    console.error('ERROR: supabase.auth is undefined in HomePage!');
    return;
  }
  // --- END ADDED LOGS ---

  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  // Add error handling
  if (error) {
    console.error('HomePage getSession error:', error);
  }
  console.log('HomePage - Session:', session ? 'User logged in' : 'No user session');

  if (session) {
    redirect('/dashboard')
  } else {
    redirect('/auth/login')
  }
}