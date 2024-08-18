'use client';
import client from '@/tina/__generated__/client';
import { LETTERS_NUMBERS_HYPEN_BLANK_REGEX } from '@/utils/constants';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import * as Form from '@radix-ui/react-form';
import { FilePlusIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Text } from '@radix-ui/themes';

/** Card component that includes a form to create new files */
export default () => {
  return (
    <Card className='h-48 w-full max-w-full rounded-lg bg-slate-100'>
      <Flex gap={'1'} className='mb-4'>
        <AccessibleIcon label='Create new file cta icon'>
          <FilePlusIcon className='text-blue-600' width={24} height={24} />
        </AccessibleIcon>
        <Text className={'text-blue-600'}>New File</Text>
      </Flex>
      <Form.Root
        onSubmit={async (event) => {
          event.preventDefault();

          const newFilename = Object.fromEntries(
            new FormData(event.currentTarget)
          ).name as string;

          try {
            const newFile = await client.queries.createFile({
              relativePath: `/${newFilename}.mdx`,
              params: {
                file: {
                  name: newFilename,
                },
              },
            });
            console.info('New file: ', newFile);
          } catch (error) {
            console.error('New file error: ', error);
          }
          
        }}
      >
        <Form.Field name='name'>
          <Form.Control asChild>
            <input
              className={
                'w-64 shadow-inner px-2 py-1 bg-white border rounded-md focus:shadow-outline focus:border-blue-500 focus:outline-none mb-2'
              }
              placeholder='Insert file name here ...'
              type='text'
              required
            />
          </Form.Control>
          <Form.Message
            match={(value) => {
              return LETTERS_NUMBERS_HYPEN_BLANK_REGEX.test(value)
                ? false
                : true;
            }}
          >
            <p className='mb-2'>Letters, numbers, hyphen and blanks only!</p>
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <Button
            title='Create a new file'
            variant='solid'
            className='bg-blue-600 cursor-pointer'
          >
            Create new file
          </Button>
        </Form.Submit>
      </Form.Root>
    </Card>
  );
};
