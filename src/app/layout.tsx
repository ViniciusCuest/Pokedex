import '../styles/globals.css'
import { Nunito } from 'next/font/google';
import Loading from './loading';
import { Suspense } from 'react';
import { ApolloWrapper } from '@/context/apollo-provider';
import { SavedDataProvider } from '@/context/local-provider';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { __DEV__ } from '@apollo/client/utilities/globals';

if (__DEV__) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

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
        <Suspense fallback={<Loading />}>
          <ApolloWrapper>
            <SavedDataProvider>
              {
                children
              }
            </SavedDataProvider>
          </ApolloWrapper>
        </Suspense>

      </body>
    </html>
  )
}
