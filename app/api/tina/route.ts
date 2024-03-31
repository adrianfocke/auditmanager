import type { TinaBackendParcel } from '@/types/index';
import { NextResponse } from 'next/server';
import client from '../../../tina/__generated__/client';

export async function POST(request: Request) {
  const tinaBackendParcel: TinaBackendParcel = await request.json();
  const { query, variables } = tinaBackendParcel;

  const { data, errors } = await client.queries[query](variables as any);

  return NextResponse.json({ data, errors }, { status: 200 });
}
