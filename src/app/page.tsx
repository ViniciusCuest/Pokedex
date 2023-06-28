import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import { Header } from '@/components/Header';
import { ScrollContainer } from '@/components/ScrollContainer';
import { DataProps } from '@/types/api.types';
import { Cards } from "@/components/Cards";

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
      is_legendary
      is_mythical
      is_baby
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
  legendary: pokemon_v2_pokemon(limit: 20 where: {pokemon_v2_pokemonspecy: {is_legendary: {_eq: true}}}) {
    id
    name
    weight
    height
    pokemon_species_id
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
        id
      }
    }
    pokemon_v2_pokemonspecy {
      is_legendary
      is_mythical
      is_baby
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
      sprites
      id
      pokemon_id
    }
  }
}
`;

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://beta.pokeapi.co/graphql/v1beta'
    })
  })
});

export default async function Home() {
  const { data }: DataProps[] | any = await getClient().query({
    query
  });
  return (
    <main className='overflow-x-hidden'>
      <Header />
      <ScrollContainer
        data={data.poke}
        title="Favoritos"
      />
      <ScrollContainer
        data={data.legendary}
        title="Lendários"
        legendary
      />
      <section>
        <div className='grid grid-cols-5'>
          {
            data.poke.map((item) => (
              <Cards isLegendary={false} {...item} />
            ))
          }
        </div>
      </section>
    </main>
  );
}
