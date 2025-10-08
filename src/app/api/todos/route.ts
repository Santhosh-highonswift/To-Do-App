import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('User authentication error:', userError);
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      todos: todos || [] 
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { task, description, priority, due_date } = body;

    if (!task?.trim()) {
      return NextResponse.json({ error: 'Task is required' }, { status: 400 });
    }

    const { data: todo, error } = await supabase
      .from('todos')
      .insert([{
        task: task.trim(),
        description: description?.trim() || null,
        priority: priority || 'medium',
        due_date: due_date ? new Date(due_date).toISOString() : null,
        user_id: user.id,
        status: 'pending',
        is_completed: false
      }])
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      todo 
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}