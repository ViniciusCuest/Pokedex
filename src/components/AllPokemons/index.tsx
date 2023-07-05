'use client';
import { DataProps, ResultDataProps } from '@/types/api.types';
import { Cards } from '../Cards';
import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { gql } from '@apollo/client';
import { useLocalData } from '@/context/local-provider';

export function AllPokemons(prop: DataProps) {

  const { handleFavoriteCard, favorites } = useLocalData();

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
    refetch({
      variable: generationId
    });
  }, [generationId]);

  return (
    <>
      <div className='flex flex-row items-center justify-between pr-12'>
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
          <option value='1'>Geração 1</option>
          <option value='2'>Geração 2</option>
          <option value='3'>Geração 3</option>
        </select>
      </div>
      <div className='grid grid-cols-5 gap-y-8'>
        {
          data?.poke?.filter((item: any) => !favorites.includes(item.id)).map((item: ResultDataProps) => {
            //console.log(cardColor[item.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name]);
            return (
              <Cards
                key={item.id}
                size='small'
                favorite={handleFavoriteCard}
                unfavorite={() => { }}
                {...item}
              />
            )
          })
        }
      </div>
    </>

  );
}
