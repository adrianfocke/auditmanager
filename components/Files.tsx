'use client';
import type { File } from '@/tina/__generated__/types';
import { fileInEditMode } from '@/utils/path';
import { Grid, Link } from '@radix-ui/themes';
import { uniqueUuid } from 'docx';
import ContextCard from './Card/ContextCard';
import NewFileCard from './Card/NewFileCard';

type FilesProps = {
  files: File[];
};

export default ({ files }: FilesProps) => {
  return (
    <Grid columns='3' gap='3' className='pt-6'>
      <NewFileCard />

      {files.map((file) => (
        <Link
          className={file.name === 'test' ? 'hidden' : ''}
          title={`Go to file ${file.name}`}
          style={{ textDecoration: 'none' }}
          data-testid={`${file.name}`}
          href={fileInEditMode(file._sys.filename)}
          key={uniqueUuid()}
        >
          <ContextCard file={file} />
        </Link>
      ))}
    </Grid>
  );
};



