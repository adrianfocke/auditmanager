'use client';
import { usePatchDocument } from '@/app/api/document/patch/hook';
import { FileQuery } from '@/tina/__generated__/types';
import type { Placeholders } from '@/types/index';
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
  const { patchedDocument } = usePatchDocument(data, placeholders);

  return (
    <>
      {patchedDocument && (
        <>
          <EditorPanel
            patchedDocument={patchedDocument}
            patchedDocumentName={data.file.name}
          />
          <Preview file={data} patchedDocument={patchedDocument} />
        </>
      )}
    </>
  );
};

