'use server';
import patchableEntityMapper from '@/tina/patchable-entity/patchableEntityMapper';
import type { PatchBackendParcel, Patches, Skeleton } from '@/types/index';
import { patchDocument } from 'docx';
import { readFileSync, writeFileSync } from 'fs';
import { staticFilePath } from './path';

export default async (patchParcel: PatchBackendParcel) => {
  const {
    file: {
      file: { entity, skeleton },
    },
    placeholders,
  } = patchParcel;

  const givenEntity = patchableEntityMapper[entity?.__typename!];
  const patches: Patches = givenEntity.patches(entity, placeholders);
  const file = readFileSync(staticFilePath(skeleton as Skeleton));

  try {
    const patch = await patchDocument(file, {
      patches,
    }).then((patch) => patch);

    return patch;
  } catch (error) {
    console.error(error);
  }

  return undefined;
};