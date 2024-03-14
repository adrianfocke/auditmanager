import type { View } from '@/types/index';
import { Card, Table } from '@radix-ui/themes';
import { uniqueUuid } from 'docx';
import PlaceholderControl from '../PlaceholderControl';

export default (props: View) => {
  const { placeholder, tinaField, value } = props;
  return (
    <Card>
      <PlaceholderControl placeholder={placeholder} tinaField={tinaField} />
      <Table.Root>
        <Table.Body>
          {(value as []).map((item: any) => {
            return (
              <Table.Row key={uniqueUuid()}>
                {item.map((item: string | []) =>
                  Array.isArray(item) ? (
                    <Table.Cell key={uniqueUuid()}>
                      {(item as []).map((text, i) => (
                        <p key={uniqueUuid()}>{text}</p>
                      ))}
                    </Table.Cell>
                  ) : (
                    <Table.Cell key={uniqueUuid()}>{item}</Table.Cell>
                  )
                )}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};
