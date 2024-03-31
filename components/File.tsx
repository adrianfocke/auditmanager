'use client';
import { usePatchDocument } from '@/app/api/patch/hook';
import patchableEntityMapper from '@/tina/patchable-entity/patchableEntityMapper';
import type { Placeholders } from '@/types/index';
import { uniqueUuid } from 'docx';
import { useTina } from 'tinacms/dist/react';
import { FileQuery } from '../tina/__generated__/types';
import EditorPanel from './EditorPanel';
import { renderView } from './View';

type FileProps = {
  placeholders: Placeholders;
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
  const givenEntity = patchableEntityMapper[data.file.entity?.__typename!];

  return (
    <>
      <EditorPanel patchedDocument={(document && document.data) || undefined} />
      {givenEntity &&
        placeholders.map((placeholder) => (
          <div key={uniqueUuid()} className='mb-4'>
            {renderView({
              placeholder,
              tinaField: givenEntity.placeholderTinaField(data, placeholder),
              value: givenEntity.placeholderValue(data, placeholder),
              viewType: givenEntity.placeholderValueType(placeholder),
            })}
          </div>
        ))}
    </>
  );
};

