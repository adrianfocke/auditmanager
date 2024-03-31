'use client';
import type { FileLinkInfo } from '@/types/index';
import { Grid, Link } from '@radix-ui/themes';
import { uniqueUuid } from 'docx';
import { useTinaQuery } from '../app/api/tina/hook';
import { fileInEditMode } from '../utils/path';
import ContextCard from './Card/ContextCard';
import NewFileCard from './Card/NewFileCard';

type FilesProps = {
  files: FileLinkInfo[];
};

export default ({ files }: FilesProps) => {
  return (
    <Grid columns='3' gap='3'>
      <NewFileCard />

      {files.map((item, i) => (
        <Link
          className={item.name === 'test' ? 'hidden' : ''}
          title={`Go to file ${item.name}`}
          style={{ textDecoration: 'none' }}
          data-testid={`${item.name}`}
          href={fileInEditMode(item.link)}
          key={uniqueUuid()}
        >
          <ContextCard
            text={item.name ?? item.link}
            href={fileInEditMode(item.link)}
          />
        </Link>
      ))}
    </Grid>
  );
};



