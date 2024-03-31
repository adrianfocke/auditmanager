'use client';
import patchDocument from '@/app/actions/patchDocument';
import patchableEntityMapper from '@/tina/patchable-entity/patchableEntityMapper';
import type { Placeholders, Skeleton } from '@/types/index';
import { uniqueUuid } from 'docx';
import { useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import { FileQuery } from '../tina/__generated__/types';
import EditorPanel from './EditorPanel';
import { renderView } from './View';

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
  const [patchedDocument, setPatchedDocument] = useState<string | undefined>();
  const givenEntity = patchableEntityMapper[data.file.entity?.__typename!];

  useEffect(
    () => {
      const {
        file: { entity, name, skeleton },
      } = data;

      if (placeholders) {
        const patchDocumentOnServer = async () => {
          try {
            const patchedDocument = await patchDocument({
              entity,
              filename: name,
              placeholders,
              skeleton: skeleton as Skeleton,
            });
            setPatchedDocument(patchedDocument);
          } catch (error) {
            console.error('Error patching document:', error);
          }
        };

        if (skeleton && entity && name) {
          patchDocumentOnServer();
        }
      }
    },
    [data, placeholders] /* TODO Only trigger when "Save" button is clicked */
  );

  return (
    placeholders &&
    givenEntity && (
      <>
        <EditorPanel patchedDocument={patchedDocument} />
        {placeholders.map((placeholder) => (
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
    )
  );
};

