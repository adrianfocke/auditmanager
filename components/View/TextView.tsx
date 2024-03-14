import type { View } from '@/types/index';
import { Card, Text } from '@radix-ui/themes';
import PlaceholderControl from '../PlaceholderControl';

export default (props: View) => {
  const { placeholder, tinaField, value } = props;

  return (
    <Card className='w-64'>
      <PlaceholderControl placeholder={placeholder} tinaField={tinaField} />
      <Text as='div'>{value}</Text>
    </Card>
  );
};
