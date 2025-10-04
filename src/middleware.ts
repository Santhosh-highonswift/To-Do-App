
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('--- Middleware running ---');
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // This refreshes tokens if needed and syncs cookies
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
