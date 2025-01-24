import { ClerkProvider } from '@clerk/nextjs';
import '../app/style/globals.css';
import { Roboto } from 'next/font/google';


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});



export const metadata = {
  title: 'Hospital Services',
  description: 'An example app of hospital services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <head>
          <title>{metadata.title}</title>
          <meta name='description' content={metadata.description} />
        </head>
        <body>
          <div className={`${roboto.className} root`}>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}