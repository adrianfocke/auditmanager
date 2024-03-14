import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

type PlaceholderControlProps = {
  placeholder: string;
  tinaField?: string;
};

export default ({ placeholder, tinaField }: PlaceholderControlProps) => (
  <Flex align={'center'} justify={'between'} className='mb-2'>
    <Text color='gray' as='div' size={'1'}>
      {placeholder.replace('field_', '').replaceAll('_', ' ')}
    </Text>
    {tinaField && (
      <Button
        className='bg-tina-grey'
        size={'1'}
        radius={'medium'}
        variant={'soft'}
        data-tina-field={tinaField}
      >
        <Pencil2Icon className='text-tina-blue' />
      </Button>
    )}
  </Flex>
);
