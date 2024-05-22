import { Flex } from '@radix-ui/themes';
import { renderAsync } from 'docx-preview';
import { useEffect } from 'react';

type PreviewProps = {
  previewDocument: Blob;
};

export default ({ previewDocument }: PreviewProps) => {
  useEffect(() => {
    const container = document.getElementById('preview-container');

    if (previewDocument && container) {
      renderAsync(previewDocument, container, undefined, {
        inWrapper: false,
        renderChanges: true,
      })
        .then(() => console.log('docx: finished'))
        .catch((err) => console.error('docx: error', err));
    }
  }, [previewDocument]);

  return (
    <Flex
      direction={'column'}
      align={'center'}
      className='overflow-auto border rounded-md m-6'
      style={{ backgroundColor: 'white' }}
      id='preview-container'
    ></Flex>
  );
};
