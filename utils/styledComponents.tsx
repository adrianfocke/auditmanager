import styles from '@/styles';
import { TextRun } from 'docx';

export const StyledTextRun = (text: string) =>
  new TextRun({
    text,
    ...styles.text.docxStyles,
  });

/** hacky way to help tina to add tina fields in the preview */
export const HiddenPreviewInfo = (text: string) =>
  new TextRun({
    text,
    vanish: true,
  });