import { docxStyles } from '@/styles';
import type { ViewType } from '@/types/index';
import { HiddenPreviewInfo, StyledTextRun } from '@/utils/styledComponents';
import { Paragraph, Table, TableCell, TableRow, type IPatch } from 'docx';

export const retrievePatchInstruction = (hints: {
  placeholder: string;
  value: string | string[] | undefined;
  viewType: ViewType;
}): IPatch => {
  const { placeholder, value, viewType } = hints;

  if (!value || !viewType) {
    return { type: 'paragraph', children: [] };
  }

  switch (viewType) {
    case 'TEXT':
      return {
        type: 'paragraph',
        children: [
          StyledTextRun(value as string),
          HiddenPreviewInfo(placeholder),
        ],
      };
    case 'LIST':
      return {
        type: 'file',
        children: [
          ...(value as string[]).map(
            (text) =>
              new Paragraph({
                children: [StyledTextRun(text), HiddenPreviewInfo(placeholder)],
              })
          ),
        ],
      };
    case 'TABLE':
      const rows = (value as []).map((row, i) => {
        const cells = (row as []).map((text, i) => {
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
            ...docxStyles.tableCell,
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
            columnWidths: [1562, 8784, 2556, 1920],
          }),
        ],
      };
  }

  return { type: 'paragraph', children: [] };
};
