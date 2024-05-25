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
  const { doc } = usePatchDocument(data, placeholders);
  const [blobForPreview, setBlobForPreview] = useState<Blob | null>(null);

  useEffect(() => {
    if (doc && doc.data) {
      const url = `/${doc.data}`;

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
          setBlobForPreview(blob);
        })
        .catch((error) => console.error('Error fetching DOCX file:', error));
    }
  }, [doc]);

  return (
    <>
      <EditorPanel patchedDocument={(doc && doc.data) || undefined} />
      {blobForPreview && <Preview file={data} blob={blobForPreview} />}
    </>
  );
};

