'use server';
import type { PatchParcel, Patches } from '@/types/index';
import { patchDocument } from 'docx';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import entityMapper from 'tina/entityMapper';
import { IS_RUNNING_LOCALLY } from '../../utils/constants';
import { staticFilePath } from '../../utils/path';
import { supabaseUpsert } from '../../utils/supabase';

export default async (patchParcel: PatchParcel) => {
  const { entity, filename, placeholders, skeleton } = patchParcel;
  const givenEntity = entityMapper(entity?.__typename!);
  const patches: Patches = givenEntity.patches(entity, placeholders);
  const file = readFileSync(staticFilePath(skeleton));

  try {
    const patch = await patchDocument(file, {
      patches,
    }).then((patch) => patch);

    return IS_RUNNING_LOCALLY
      ? patchLocal(patch, filename)
      : await patchProduction(patch, filename);
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

const patchLocal = (patch: Uint8Array, filename: string) => {
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

const patchProduction = async (patch: Uint8Array, filename: string) => {
  try {
    const upload = await supabaseUpsert(filename, patch);
    return upload?.path;
  } catch (error) {
    console.error(error);
  }

  return undefined;
};
