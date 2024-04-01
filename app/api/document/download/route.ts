import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const document: string = await request.json();

  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_TOKEN!
  );

  const { data, error } = await supabaseClient.storage
    .from('Documents')
    .download(`${document}`);

  return NextResponse.json(
    { data: Array.from(new Uint8Array(await data!.arrayBuffer())) },
    { status: 200 }
  );
}
