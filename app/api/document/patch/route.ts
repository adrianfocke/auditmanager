import type { PatchBackendParcel } from '@/types/index';
import { NextResponse } from 'next/server';
import patchDocument from '../../../../utils/patchDocument';

export async function POST(request: Request) {
  const patchBackendParcel: PatchBackendParcel = await request.json();

  console.info('Bakend patch parcel: ', patchBackendParcel);

  const patch = await patchDocument(patchBackendParcel);

  if (!patch) {
    return NextResponse.json({ error: 'Could not patch document' });
  }

  return NextResponse.json({ data: patch }, { status: 200 });
}
