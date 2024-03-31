import type { ViewType } from '@/types/index';
import {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
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
      return { type: 'paragraph', children: [new TextRun(value as string)] };
    case 'LIST':
      return {
        type: 'file',
        children: [
          ...(value as string[]).map(
            (text) =>
              new Paragraph({
                text,
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
                    children: [
                      new TextRun({
                        text,
                      }),
                    ],
                  })
              )
            : [
                new Paragraph({
                  children: [
                    new TextRun({
                      text,
                    }),
                  ],
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
