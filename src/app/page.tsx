import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  } else {
    redirect('/auth/login')
  }
}