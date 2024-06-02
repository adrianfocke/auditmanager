import downloadDocx from '@/utils/downloadDocx';
import { DownloadIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { AccessibleIcon, Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type EditorPanelProps = {
  patchedDocument: Blob;
  patchedDocumentName: string;
};

export default ({ patchedDocument, patchedDocumentName }: EditorPanelProps) => {
  const router = useRouter();

  return (
    <div
      className='w-full mb-8 sticky top-0 z-10 bg-slate-100 p-6'
      style={{ borderBottom: '1px solid lightgrey' }}
    >
      <Flex gap={'2'} align={'center'}>
        <Button
          // TODO how to go to /files with tina edit mode disabled?
          onClick={() => router.back()}
          className='bg-[#0c6bff] cursor-pointer'
          title={`Go to all files`}
        >
          <AccessibleIcon label={'All Files'}>
            <ListBulletIcon width='16' height='16'></ListBulletIcon>
          </AccessibleIcon>
          All Files
        </Button>

        <Button
          onClick={() => {
            downloadDocx(patchedDocument, patchedDocumentName);
          }}
          className='bg-[#0c6bff] cursor-pointer'
          title={`Download ${patchedDocumentName}.docx`}
        >
          <AccessibleIcon label={'Download'}>
            <DownloadIcon width='16' height='16'></DownloadIcon>
          </AccessibleIcon>
          Download
        </Button>
      </Flex>
    </div>
  );
};
