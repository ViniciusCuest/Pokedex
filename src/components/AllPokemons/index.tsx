'use client';
import { DataProps, ResultDataProps } from '@/types/api.types';
import { Cards } from '../Cards';
import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { gql } from '@apollo/client';
import { useLocalData } from '@/context/local-provider';
import { motion } from 'framer-motion';

import { useScrollLock } from '../../hooks/block-scroll';

export function AllPokemons(prop: DataProps) {

  const { activateScroll } = useScrollLock();

  const { handleFavoriteCard, favorites } = useLocalData();

  const [selectedId, setSelectedId] = useState<number | null>(null);
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
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
        pokemon_v2_abilityeffecttexts (where: {language_id: {_eq: 9}}) {
          effect
          short_effect
        }
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

  useEffect(() => {
    console.log(window.screen.width)
  }, [window.screen]);

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
      <motion.div layout className='grid grid-cols-3 gap-1 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-y-8'>
        {
          data?.poke?.filter((item: any) => !favorites.includes(item.id)).map((item: ResultDataProps) => {
            return (
              <Cards
                key={item.id}
                size='small'
                setSelected={setSelectedId}
                selected={selectedId}
                favorite={handleFavoriteCard}
                unfavorite={() => { }}
                {...item}
              />
            )
          })
        }
        <motion.span
          onClick={() => {
            setSelectedId(null);
            activateScroll();
          }}
          animate={{
            opacity: !!selectedId ? .35 : 0,
            zIndex: !!selectedId ? 500 : -1,
          }}
          transition={{ duration: .5, type: 'tween' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'black',
            height: '100vh',
            opacity: 0,
            width: '100vw',
            zIndex: -1
          }}
        />
      </motion.div>
    </>
  );
}
