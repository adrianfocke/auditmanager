import type { PatchBackendParcel } from '@/types/index';
import patchDocument from '@/utils/patchDocument';

export async function POST(request: Request) {
  const patchBackendParcel: PatchBackendParcel = await request.json();

  const patch = await patchDocument(patchBackendParcel);

  const buffer = Buffer.from(patch!);

  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  return new Response(blob, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
  });
}
