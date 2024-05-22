import { DownloadIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type EditorPanelProps = {
  patchedDocument?: string;
};

export default ({ patchedDocument }: EditorPanelProps) => {
  const router = useRouter();

  return (
    <div
      className='w-full mb-8 sticky top-0 z-10 bg-tina-grey p-6'
      style={{ borderBottom: '1px solid lightgrey' }}
    >
      <Flex gap={'2'} align={'center'}>
        <Button
          // TODO how to go to /files with tina edit mode disabled?
          onClick={() => router.back()}
          className='bg-[#0c6bff] cursor-pointer'
          title={`Go to all files`}
        >
          <ListBulletIcon width='16' height='16' />
          All Files
        </Button>

        <Button
          className={`bg-[#0c6bff] ${
            patchedDocument ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          title={`Download file ${patchedDocument}`}
          onClick={async () => {
            if (window.location.hostname === 'localhost') {
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
    </div>
  );
};
