'use server';
import patchableEntityMapper from '@/tina/patchable-entity/patchableEntityMapper';
import type { Patches, Skeleton } from '@/types/index';
import { createClient } from '@supabase/supabase-js';
import { patchDocument } from 'docx';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import type { PatchBackendParcel } from '../app/api/patch/route';
import { IS_RUNNING_LOCALLY } from './constants';
import { staticFilePath } from './path';

export default async (patchParcel: PatchBackendParcel) => {
  const {
    file: {
      file: { entity, skeleton, name },
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

    return IS_RUNNING_LOCALLY
      ? patchLocalDocument(patch, name)
      : await patchProductionDocument(patch, name);
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

const patchLocalDocument = (patch: Uint8Array, filename: string) => {
  const newFilePath = path.join(`public/${filename}.docx`);
  writeFileSync(newFilePath, patch);

  try {
    writeFileSync(newFilePath, patch);
    return `${filename}.docx`;
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

const patchProductionDocument = async (patch: Uint8Array, filename: string) => {
  const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_TOKEN!
  );

  const { data, error } = await supabaseClient.storage
    .from('Documents')
    .upload(`${filename}.docx`, patch, {
      contentType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      upsert: true,
    });

  return data?.path ? data.path : undefined;
};
