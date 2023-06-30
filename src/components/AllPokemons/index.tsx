'use client';
import { DataProps, ResultDataProps } from '@/types/api.types';
import { Cards } from '../Cards';
import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ApolloQueryResult, OperationVariables, gql } from '@apollo/client';
export function AllPokemons(prop: DataProps) {

  const [generationId, setGenerationId] = useState(1);

  const query = gql`query Now($variable: Int!) {
  poke: pokemon_v2_pokemon(limit: 100, where: {pokemon_v2_pokemonspecy: {pokemon_v2_generation: {id: {_eq: $variable }}}}) {
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
      id
      sprites
    }
  }
}
  `;
  const { error, data, refetch } = useSuspenseQuery(query, {
    variables: {
      variable: generationId
    }
  });

  useEffect(() => {
    console.log(generationId);
    refetch()
  }, [generationId]);


  return (
    <>
      <h1
        className='text-3xl font-bold font-sans mt-12 ml-4 text-black_900 mb-4 sm:mb-8 sm:text-6xl sm:mt-4'
      >
        Todos
      </h1>
      <select
        name=''
        id=''
        onChange={(evt) => {
          evt.preventDefault();
          if (generationId === Number(evt.target.value))
            return;

          setGenerationId(Number(evt.target.value));
        }}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
      </select>
      <div className='grid grid-cols-5 gap-y-8'>
        {
          data?.poke?.map((item: ResultDataProps) => {
            return (
              <Cards
                key={item.id}
                size='small'
                {...item}
              />
            )
          })
        }
      </div>
    </>

  );
}
