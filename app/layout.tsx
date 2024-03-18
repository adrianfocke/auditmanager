import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { createContext } from 'react';
import '../styles/global.css';
import client from '../tina/__generated__/client';

export const TinaClientContext = createContext<any>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-50'>
        <Theme>
          <Container className='p-6' size='4'>
            <TinaClientContext.Provider value={client}>
              {children}
            </TinaClientContext.Provider>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
