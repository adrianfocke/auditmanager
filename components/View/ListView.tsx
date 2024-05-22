import styles from '@/styles';
import type { View } from '@/types/index';
import { TriangleRightIcon } from '@radix-ui/react-icons';
import { Card, Flex, Text } from '@radix-ui/themes';
import { uniqueUuid } from 'docx';
import PlaceholderControl from '../PlaceholderControl';

export default (props: View) => {
  const { placeholder, tinaField, value } = props;

  return (
    <Card className='w-80'>
      <PlaceholderControl placeholder={placeholder} tinaField={tinaField} />
      <Flex direction={'column'}>
        {(value as string[]).map(
          (listItem) =>
            listItem && (
              <Flex key={uniqueUuid()} align={'center'}>
                <TriangleRightIcon />
                <Text className={`${styles.text.className}`} key={uniqueUuid()}>
                  {listItem}
                </Text>
              </Flex>
            )
        )}
      </Flex>
    </Card>
  );
};
