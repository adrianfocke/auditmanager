import type { Styles } from '@/types/index';
import type { IRunOptions } from 'docx';

export default {
  text: {
    className: `text-my-black`,
    docxStyles: {
      color: '000000',
      font: 'Arial',
      size: 20,
    } as IRunOptions,
  },
} as Styles;
