import { docxStyles } from '@/styles';
import { TextRun } from 'docx';

export const StyledTextRun = (text: string) =>
  new TextRun({
    ...docxStyles.text,
    text,
  });

/** hacky way to help tina to add tina fields in the preview */
export const HiddenPreviewInfo = (text: string) =>
  new TextRun({
    vanish: true,
    text,
  });
