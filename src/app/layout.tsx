import '../styles/globals.css'
import { Nunito } from 'next/font/google';
import Loading from './loading';
import { Suspense } from 'react';
import { ApolloWrapper } from '@/context/apollo-provider';
import { SavedDataProvider } from '@/context/local-provider';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata = {
  title: 'Pokedex',
  description: 'Conheça mais sobre o mundo Pokémon',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${nunito.variable}`}>
      <body>
        <ApolloWrapper>
          <SavedDataProvider>
            <Suspense fallback={<Loading />}>
              {
                children
              }
            </Suspense>
          </SavedDataProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
