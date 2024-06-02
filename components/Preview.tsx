import type { FileQuery } from '@/tina/__generated__/types';
import patchableEntityMapper from '@/tina/patchable-entity/patchableEntityMapper';
import { Flex } from '@radix-ui/themes';
import { renderAsync } from 'docx-preview';
import { useEffect } from 'react';

type PreviewProps = {
  file: FileQuery;
  patchedDocument: Blob;
};

export default ({ file, patchedDocument }: PreviewProps) => {
  const givenEntity = patchableEntityMapper[file.file.entity?.__typename!];

  useEffect(() => {
    const container = document.getElementById('preview-container');

    if (patchedDocument && container) {
      renderAsync(patchedDocument, container, undefined, {
        inWrapper: false,
        renderChanges: true,
      })
        .then(() => {
          const spans = document.querySelectorAll('span');

          const filteredSpans = Array.from(spans).filter((span) =>
            span.innerHTML.startsWith('field_')
          );

          filteredSpans &&
            filteredSpans.forEach((span) => {
              const parentParagraph = span.parentElement;
              parentParagraph!.setAttribute(
                'data-tina-field',
                givenEntity.placeholderTinaField(file, span.innerHTML)!
              );
              parentParagraph!.className = 'p-1 m-1';
            });
        })
        .catch((err) => console.error('docx: error', err));
    }
  }, [patchedDocument, file, givenEntity]);

  return (
    <Flex
      direction={'column'}
      align={'center'}
      className='overflow-auto border rounded-md m-6'
      style={{ backgroundColor: 'white' }}
      id='preview-container'
      data-testid='preview-container'
    />
  );
};
