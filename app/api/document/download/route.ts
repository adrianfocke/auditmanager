import type { FileQuery } from '@/tina/__generated__/types';
import type { Placeholders } from '@/types/index';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export type PatchBackendParcel = {
  file: FileQuery;
  placeholders: Placeholders;
};

export const downloadDocument = async (document: string) => {
  const req = await fetch('/api/document/download', {
    method: 'POST',
    body: JSON.stringify(document),
  });

  return await req.json();
};

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
