import type {
  DocxStringConversionResult,
  Placeholders,
  Skeleton,
} from '@/types/index';
import mammoth from 'mammoth';
import { PLACEHOLDER_REGEX } from './constants';
import { staticFilePath } from './path';

export default async (skeleton: Skeleton) => {
  if (!skeleton) {
    return undefined;
  }

  let htmlStringFromDocx = await createHtmlStringFromDocx(skeleton);

  if (!htmlStringFromDocx) {
    return undefined;
  }

  return findPlaceholdersInHtmlString(htmlStringFromDocx);
};

export const createHtmlStringFromDocx = async (skeleton: Skeleton) => {
  try {
    const path = staticFilePath(skeleton);
    const result: DocxStringConversionResult = await mammoth.convertToHtml({
      path,
    });
    return result.value;
  } catch (error) {
    console.error(error);
  }
};

export const findPlaceholdersInHtmlString = (
  htmlString: string
): Placeholders | undefined => {
  const placeholders = htmlString
    .match(PLACEHOLDER_REGEX)
    ?.map((placeholder) => placeholder.replace('{{', '').replace('}}', ''));

  return placeholders ? (placeholders as Placeholders) : undefined;
};
