import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://beta.pokeapi.co/graphql/v1beta',
      fetchOptions: {
        cache: 'force-cache'
      }
    })
  })
});

export { getClient };
