import styles from '@/styles';
import { TextRun } from 'docx';

export const StyledTextRun = (text: string) =>
  new TextRun({
    text,
    ...styles.text.docxStyles,
  });
