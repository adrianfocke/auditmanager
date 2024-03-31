'use client';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import * as Form from '@radix-ui/react-form';
import { FilePlusIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Text } from '@radix-ui/themes';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { LETTERS_NUMBERS_HYPEN_BLANK_REGEX } from '../../utils/constants';

/** Card component that includes a form to create new files */
export default () => {
  const router = useRouter();

  return (
    <Card className='h-48 w-full max-w-full rounded-lg bg-tina-grey'>
      <Flex gap={'1'} className='mb-4'>
        <AccessibleIcon label='Create new file cta icon'>
          <FilePlusIcon className='text-tina-blue' width={24} height={24} />
        </AccessibleIcon>
        <Text className='text-tina-blue select-none'>New File</Text>
      </Flex>
      <Form.Root
        onSubmit={async (event) => {
          event.stopPropagation();
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
            className='bg-tina-blue cursor-pointer'
          >
            Create new file
          </Button>
        </Form.Submit>
      </Form.Root>
    </Card>
  );
};
