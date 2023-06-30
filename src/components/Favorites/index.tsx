'use client';

import { useLocalData } from '@/context/local-provider';
import { gql, useSuspenseQuery } from '@apollo/client';
import { useEffect } from 'react';
import { VerticalContainer } from '../VerticalContainer';


export function Favorites() {
  const { favorites } = useLocalData();
  const query = gql`query Now($variable: [Int]!) {
    favorites: pokemon_v2_pokemon(where: { id: {_in: $variable }}) {
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
      variable: favorites
    }
  });

  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <VerticalContainer
      data={data.favorites}
    />
  );
}
