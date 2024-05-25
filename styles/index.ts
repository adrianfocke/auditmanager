import { BorderStyle, type IRunOptions, type ITableCellOptions } from 'docx';

export const tailwindStyles = {
  text: 'text-tina-blue',
};

export const docxStyles = {
  text: {
    color: '000000',
    font: 'Arial',
    size: 20,
  } as IRunOptions,
  tableCell: {
    borders: {
      top: {
        style: BorderStyle.DOT_DOT_DASH,
        size: 3,
        color: 'ff8000',
      },
    },
  } as ITableCellOptions,
};
