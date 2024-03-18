import type { PickerType } from '@/types/index';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Card, Text } from '@radix-ui/themes';
import { uniqueUuid } from 'docx';
import React, { useContext, useEffect } from 'react';
import { wrapFieldsWithMeta } from 'tinacms';
import { TinaClientContext } from '../../app/layout';
import client from '../__generated__/client';
import { queryMapper } from './queries';

export default (type: PickerType) =>
  wrapFieldsWithMeta((props) => {
    const [values, setValues] = React.useState<string[] | undefined>(undefined);
    console.log('Values for picker: ', values);

    console.log('Tina client in Picker: ', client);

    const tinaClient = useContext(TinaClientContext);
    console.log('Context client: ', tinaClient);

    useEffect(() => {
      console.log('Props for picker: ', props);
      Promise.resolve(queryMapper[type]()).then(
        (values) => values && setValues(values)
      );
    }, [props]);

    if (!values) {
      return null;
    }

    return (
      <div key={uniqueUuid()}>
        <Text className='font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2'>
          {type}
        </Text>
        <Card className='h-fit max-h-64 overflow-y-scroll rounded-lg bg-tina-grey'>
          {values.map((item: string, i) => (
            <div key={uniqueUuid()}>
              <Checkbox.Root
                onClick={() => {
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
