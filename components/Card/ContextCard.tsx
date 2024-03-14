import * as ContextMenu from '@radix-ui/react-context-menu';
import { FileIcon } from '@radix-ui/react-icons';
import { AccessibleIcon, Card, Flex, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type ContextCardProps = {
  text: string;
  href: string;
};

/** Card component with context menu wrapped around which displays file actions */
export default ({ text, href }: ContextCardProps) => {
  const router = useRouter();
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger
        className={'w-full max-w-full rounded-lg cursor-pointer'}
      >
        <Card className={'h-48 w-full max-w-full rounded-lg'}>
          <Flex gap={'1'} className='mb-4'>
            <AccessibleIcon label='File link icon'>
              <FileIcon className='text-tina-blue' width={24} height={24} />
            </AccessibleIcon>
            <Text className='select-none text-tina-blue'>File</Text>
          </Flex>
          <Text className='text-black'>{text}</Text>
        </Card>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className='w-48 px-2 py-2 text-sm border bg-white rounded-md overflow-hidden shadow-xl'>
          <ContextMenu.Label>
            <Text className='text-gray-500 px-1 font-medium mb-1'>
              File Actions (WIP)
            </Text>
          </ContextMenu.Label>
          <ContextMenu.Item className='text-gray-500 w-full hover:bg-blue-500 px-1 py-1 rounded-md hover:text-white hover:cursor-pointer'>
            Open
          </ContextMenu.Item>
          <ContextMenu.Item className='text-gray-500 w-full hover:bg-blue-500 px-1 py-1 rounded-md hover:text-white hover:cursor-pointer'>
            Delete
          </ContextMenu.Item>
          <ContextMenu.Item className='text-gray-500 w-full hover:bg-blue-500 px-1 py-1 rounded-md hover:text-white hover:cursor-pointer'>
            Duplicate
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
