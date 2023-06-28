import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import { Header } from '@/components/Header';
import { VerticalContainer } from '@/components/VerticalContainer';
import { DataProps } from '@/types/api.types';
import { Cards } from "@/components/Cards";
import { AllPokemons } from "@/components/AllPokemons";

const query = gql`{
  poke: pokemon_v2_pokemon(limit: 100, where: {pokemon_v2_pokemonspecy: {pokemon_v2_generation: {id: {_eq: 2}}}}) {
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
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <main className='overflow-x-hidden'>
      <Header />
      <VerticalContainer
        data={data.poke}
        title="Favoritos"
      />
      <VerticalContainer
        data={data.legendary}
        title="Lendários"
        legendary
      />
      <section className="relative pt-3 px-5 sm:py-8 sm:mt-8 sm:pl-14">
        <AllPokemons data={data.poke} />
      </section>
    </main>
  );
}
