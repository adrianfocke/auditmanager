import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '../styles/global.css';

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
            {children}
          </Container>
        </Theme>
      </body>
    </html>
  );
}
