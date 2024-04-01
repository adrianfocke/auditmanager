import type { PatchBackendParcel } from '@/types/index';
import patchDocument from '@/utils/patchDocument';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const patchBackendParcel: PatchBackendParcel = await request.json();

  console.info('Bakend patch parcel: ', patchBackendParcel);

  const patch = await patchDocument(patchBackendParcel);

  if (!patch) {
    return NextResponse.json({ error: 'Could not patch document' });
  }

  return NextResponse.json({ data: patch }, { status: 200 });
}
