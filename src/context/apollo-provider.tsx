'use client';

import {
  ApolloLink,
  HttpLink,
  SuspenseCache,
} from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient
} from '@apollo/experimental-nextjs-app-support/ssr';
import { ReactElement } from 'react';

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    fetchOptions: {
      cache: 'force-cache'
    }
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: typeof window === 'undefined' ?
      ApolloLink.from([
        new SSRMultipartLink({
          stripDefer: true,
        }),
        httpLink,
      ]) :
      httpLink,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren): ReactElement {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
