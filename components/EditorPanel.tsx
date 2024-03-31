import downloadDocument from '@/utils/downloadDocument';
import { DownloadIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { IS_RUNNING_LOCALLY } from 'utils/constants';

type EditorPanelProps = {
  patchedDocument?: string;
};

export default ({ patchedDocument }: EditorPanelProps) => {
  const router = useRouter();

  return (
    <Card className='mb-2 w-max mb-8 sticky top-6 z-10 bg-white'>
      <Flex gap={'2'} align={'center'}>
        <Button
          // TODO how to go to /files with tina edit mode disabled?
          onClick={() => router.back()}
          className='bg-[#0c6bff]'
          title={`Go to all files`}
        >
          <ListBulletIcon width='16' height='16' />
          All Files
        </Button>

        <Button
          disabled={!patchedDocument}
          className='bg-[#0c6bff]'
          title={`Download file ${patchedDocument}`}
          onClick={async () => {
            IS_RUNNING_LOCALLY
              ? router.push(`/${patchedDocument}`)
              : await downloadDocument(patchedDocument!);
          }}
        >
          <DownloadIcon width='16' height='16' />
          Download
        </Button>
      </Flex>
    </Card>
  );
};
