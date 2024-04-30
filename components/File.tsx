'use client';
import { usePatchDocument } from '@/app/api/document/patch/hook';
import { FileQuery } from '@/tina/__generated__/types';
import patchableEntityMapper from '@/tina/patchable-entity/patchableEntityMapper';
import type { Placeholders } from '@/types/index';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import { uniqueUuid } from 'docx';
import { tinaField, useTina } from 'tinacms/dist/react';
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
  skeletonLanguage?: string;
};

export default ({ placeholders, result, skeletonLanguage }: FileProps) => {
  const { data } = useTina(result);
  const { document } = usePatchDocument(data, placeholders);
  const givenEntity = patchableEntityMapper[data.file.entity?.__typename!];

  return (
    <>
      {data.file.language !== skeletonLanguage && (
        <Callout.Root className='mb-4'>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            You have a mismatch in your skeleton and display language. Maybe
            check your{' '}
            <span data-tina-field={tinaField(data.file, 'skeleton')}>
              skeleton
            </span>{' '}
            or{' '}
            <span data-tina-field={tinaField(data.file, 'language')}>
              language
            </span>{' '}
            setting!
          </Callout.Text>
        </Callout.Root>
      )}
      <EditorPanel patchedDocument={(document && document.data) || undefined} />
      {givenEntity &&
        placeholders?.map((placeholder) => (
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

