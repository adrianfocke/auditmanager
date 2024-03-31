import type { FileQuery } from '@/tina/__generated__/types';
import type { Placeholders } from '@/types/index';
import { NextResponse } from 'next/server';
import patchDocument from '../../../utils/patchDocument';

export type PatchBackendParcel = {
  file: FileQuery;
  placeholders: Placeholders;
};

export async function POST(request: Request) {
  const patchBackendParcel: PatchBackendParcel = await request.json();

  const patch = await patchDocument(patchBackendParcel);

  if (!patch) {
    return NextResponse.json({ error: 'Could not patch document' });
  }

  return NextResponse.json({ data: patch }, { status: 200 });
}
