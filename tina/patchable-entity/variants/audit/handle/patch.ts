import type { ViewType } from '@/types/index';
import { StyledTextRun } from '@/utils/styledComponents';
import {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  type IPatch,
} from 'docx';

export const retrievePatchInstruction = (
  value: string | string[] | undefined,
  viewType: ViewType
): IPatch => {
  if (!value || !viewType) {
    return { type: 'paragraph', children: [] };
  }

  switch (viewType) {
    case 'TEXT':
      return {
        type: 'paragraph',
        children: [StyledTextRun(value as string)],
      };
    case 'LIST':
      return {
        type: 'file',
        children: [
          ...(value as string[]).map(
            (text) =>
              new Paragraph({
                children: [StyledTextRun(text)],
              })
          ),
        ],
      };
    case 'TABLE':
      const rows = (value as []).map((row, i) => {
        const cells = (row as []).map((text) => {
          const children = Array.isArray(text)
            ? (text as []).map(
                (text, i) =>
                  new Paragraph({
                    children: [StyledTextRun(text)],
                  })
              )
            : [
                new Paragraph({
                  children: [StyledTextRun(text)],
                }),
              ];

          return new TableCell({
            children,
          });
        });
        return new TableRow({
          children: [...cells],
        });
      });

      return {
        type: 'file',
        children: [
          new Table({
            rows: [...rows],
            width: {
              size: 100,
              type: WidthType.AUTO,
            },
            columnWidths: [1562, 8784, 2556, 1920],
          }),
        ],
      };
  }

  return { type: 'paragraph', children: [] };
};
