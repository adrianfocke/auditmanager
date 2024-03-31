import type { TinaBackendParcel } from '@/types/index';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Card, Text } from '@radix-ui/themes';
import { uniqueUuid } from 'docx';
import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

export default (queryType: TinaBackendParcel['query']) =>
  wrapFieldsWithMeta((props) => {
    const [values, setValues] = React.useState<string[] | undefined>(undefined);

    if (!values) {
      return null;
    }

    return (
      <div key={uniqueUuid()}>
        <Text className='font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2'>
          {queryType}
        </Text>
        <Card className='h-fit max-h-64 overflow-y-scroll rounded-lg bg-tina-grey'>
          {values.map((item: string, i) => (
            <div key={uniqueUuid()}>
              <Checkbox.Root
                onClick={() => {
                  // TODO single value sleeker
                  if (queryType.includes('Constants')) {
                    props.input.onChange(item);
                    return;
                  }

                  if (props.input.value.includes(item)) {
                    const valuesWithoutCurrent = props.input.value.filter(
                      (all: any) => all !== item
                    );
                    props.input.onChange(valuesWithoutCurrent);
                  } else {
                    props.input.onChange([...props.input.value, item]);
                  }
                }}
                checked={props.input.value.includes(item)}
                className={`h-[18px] w-[18px] rounded border text-blue-500 focus:ring-indigo-500 transition ease-out duration-150 border-blue-500 shadow-sm mr-2`}
                id={`c-${i}`}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={`c-${i}`}>{item}</label>
            </div>
          ))}
        </Card>
      </div>
    );
  });
