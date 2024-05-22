'use client';
import { usePatchDocument } from '@/app/api/document/patch/hook';
import { FileQuery } from '@/tina/__generated__/types';
import type { Placeholders } from '@/types/index';
import { useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import EditorPanel from './EditorPanel';
import Preview from './Preview';

type FileProps = {
  placeholders?: Placeholders;
  result: {
    data: FileQuery;
    variables: {
      relativePath: string;
    };
    query: string;
  };
};

export default ({ placeholders, result }: FileProps) => {
  const { data } = useTina(result);
  const { document } = usePatchDocument(data, placeholders);
  const [previewDocument, setPreviewDocument] = useState<Blob | null>(null);

  useEffect(() => {
    if (document && document.data) {
      const url = `/${document.data}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.arrayBuffer();
        })
        .then((arrayBuffer) => {
          const blob = new Blob([arrayBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });
          setPreviewDocument(blob);
        })
        .catch((error) => console.error('Error fetching DOCX file:', error));
    }
  }, [document]);

  return (
    <>
      <EditorPanel patchedDocument={(document && document.data) || undefined} />
      {previewDocument && <Preview previewDocument={previewDocument} />}
    </>
  );
};

