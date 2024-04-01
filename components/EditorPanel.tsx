import { isDevelopment } from '@/utils/constants';
import { DownloadIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type EditorPanelProps = {
  patchedDocument?: string;
};

const downloadBlob = (blob: Blob, fileName: string): void => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
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
            if (isDevelopment()) {
              router.push(`/${patchedDocument}`);
              return;
            }

            const downloadDocument = async (document: string) => {
              const req = await fetch('/api/document/download', {
                method: 'POST',
                body: JSON.stringify(document),
              });

              return await req.json();
            };

            const documentAsUint8Array = await downloadDocument(
              patchedDocument!
            ).then((data: Uint8Array) => data);

            const blob = new Blob([documentAsUint8Array]);

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = patchedDocument!;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }}
        >
          <DownloadIcon width='16' height='16' />
          Download
        </Button>
      </Flex>
    </Card>
  );
};
