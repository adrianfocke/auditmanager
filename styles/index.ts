import { BorderStyle, type IRunOptions, type ITableCellOptions } from 'docx';

enum Color {
  black = '000000',
  lightgrey = 'ececec',
  darkergrey = '8f8f8f',
}

enum Size {
  text = 20,
}

export const docxStyles = {
  text: {
    color: Color.black,
    font: 'Arial',
    size: Size.text,
  } as IRunOptions,
  tableCell: {
    borders: {
      top: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: Color.lightgrey,
      },
      left: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: Color.lightgrey,
      },
      right: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: Color.darkergrey,
      },
      bottom: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: Color.darkergrey,
      },
    } as ITableCellOptions['borders'],
  } as ITableCellOptions,
};
