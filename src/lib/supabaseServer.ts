
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createClient = () => {
  console.log('SUPABASE_SERVER: createClient called');
  console.log(
    'SUPABASE_SERVER: NEXT_PUBLIC_SUPABASE_URL (first 10 chars):',
    process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10)
  );

  const cookieStore = cookies();
  console.log(
    'SUPABASE_SERVER: Initial cookieStore content (showing names only):',
    cookieStore.getAll().map((c) => c.name)
  );

  //  Use the helper that auto-reads cookies
  return createServerComponentClient({ cookies });
};
