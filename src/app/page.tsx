import { Header } from '@/components/Header';
import { ScrollContainer } from '@/components/ScrollContainer';
import { DataProps } from '@/types/api.types';

import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const query = gql`{
  poke: pokemon_v2_pokemon(limit: 100) {
    id
    name
    height
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
        id
      }
    }
    pokemon_v2_pokemonspecy {
      pokemon_v2_evolutionchain {
        id
        pokemon_v2_pokemonspecies {
          evolves_from_species_id
          name
          id
        }
      }
    }
    pokemon_v2_pokemonsprites {
      id
      sprites
    }
  }
}
`;

export default async function Home() {
  const { data }: DataProps[] | any = await getClient().query({
    query
  });
  console.log(data);

  return (
    <main className='overflow-x-hidden'>
      <Header data={data} />
      {
        <ScrollContainer data={data.poke} />
      }
      <Header />
      <ScrollContainer data={data} />
      <section className='mt-24 px-5 sm:pt-20 sm:pl-14 sm:pr-10'>
        <h1 className='text-3xl font-bold font-sans text-black_900 mb-4 sm:mb-8 sm:text-6xl'>Lendários</h1>
      </section>
    </main>
  );
}

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://beta.pokeapi.co/graphql/v1beta'
    })
  })
})

/*
async function getPokemonData(): Promise<DataProps[]> {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon', {
    cache: 'no-store'
  });
  const { results } = await response.json();

  const data = await Promise.all(
    results.map(async (pokemon: any) => {
      const response = await fetch(`${pokemon.url}`);
      const body = await response.json();
      return {
        ...body,
        evolve: await (
          await fetch(`https://pokeapi.co/api/v2/evolution-chain/${body?.id}/`)
        ).json()
      };
    })
  );

  setTimeout(() => {

  }, 10000);

  return data;
}

*/
