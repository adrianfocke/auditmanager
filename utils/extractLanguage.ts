import type { Skeleton } from '@/types/index';
import { franc } from 'franc-min';
import { createHtmlStringFromDocx } from './extractPlaceholders';

export default async (skeleton: Skeleton) => {
  if (!skeleton) {
    return undefined;
  }

  let htmlStringFromDocx = await createHtmlStringFromDocx(skeleton);

  if (!htmlStringFromDocx) {
    return undefined;
  }

  return franc(htmlStringFromDocx);
};
