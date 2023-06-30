import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';

import { Header } from '@/components/Header';
import { VerticalContainer } from '@/components/VerticalContainer';
import { DataProps } from '@/types/api.types';
import { AllPokemons } from '@/components/AllPokemons';
import { Favorites } from '@/components/Favorites';
import { Legendary } from '@/components/Legendary';


const query = gql`{
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
      pokemon_v2_generation {
        id
        name
      }
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


export default async function Home() {
  const { data }: DataProps[] | any = await getClient().query({
    query
  });
  return (
    <main className='overflow-x-hidden bg-background'>
      <Header />
      <Favorites />
      <Legendary />
      <VerticalContainer
        data={data.legendary}
        title='Lendários'
        legendary
      />
      <section className='relative pt-3 px-5 sm:py-8 sm:mt-8 sm:pl-14'>
        <AllPokemons data={data.poke} />
      </section>
    </main>
  );
}
