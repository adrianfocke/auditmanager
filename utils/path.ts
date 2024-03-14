import type { Skeleton } from '@/types/index';
import path from 'path';

export const staticFilePath = (skeleton: Skeleton) => {
  const basePath = process.cwd();
  let filePath = null;

  skeleton.includes('assets.tina') &&
    (filePath = path.join(
      basePath,
      'public',
      'skeletons',
      fileNameFromSkeleton(skeleton)
    ));

  return filePath ? filePath : path.join(process.cwd(), 'public', skeleton);
};

const fileNameFromSkeleton = (skeleton: Skeleton) =>
  skeleton.substring(skeleton.lastIndexOf('/') + 1);

export const fileInEditMode = (page: string) => `/admin/index.html#/~/files/${page}`;