import {
  createHtmlStringFromDocx,
  findPlaceholdersInHtmlString,
} from '@/utils/extractPlaceholders';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

const expectedHtmlString = '<p>{{field_client_name}}</p>';
const expectedPlaceholders = ['field_client_name'];

describe('Extract placeholders', () => {
  it('creates html string from docx', async () => {
    const htmlString = await createHtmlStringFromDocx('test/test.docx' as any);
    expect(htmlString).toStrictEqual(expectedHtmlString);
  });

  it('finds placeholders in html string', () => {
    const placeholders = findPlaceholdersInHtmlString(expectedHtmlString);
    expect(placeholders).toStrictEqual(expectedPlaceholders);
  });
});
