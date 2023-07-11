
import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';

import { badgeColor, cardColor, pokeTypeColor } from '@/utils/color-components';
import { AreaLayout } from './area-layout';


interface Props {
  params: {
    slug: string;
  }
}
export type QueryData = {
  pokemon_v2_pokemon_by_pk: {
    id: number;
    name: string;
    height: number;
    base_experience: any;
    order: number;
    pokemon_species_id: number;
    pokemon_v2_pokemontypes: [
      pokemon_v2_type: {
        id: number;
        name: string;
      }
    ]
  }
}

export default async function Pokemon({ params }: Props) {
  const query = gql`query Now($variable: Int!) {
    pokemon_v2_pokemon_by_pk(id: $variable) {
      name
      id
      height
      weight
      base_experience
      order
      pokemon_species_id
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
          pokemon_v2_abilityflavortexts (where: {language_id: {_eq: 9}}) {
            flavor_text
          }
          pokemon_v2_abilityeffecttexts (where: {language_id: {_eq: 9}}) {
            effect
            short_effect
          }
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          id
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            evolves_from_species_id
            name
            id
            pokemon_v2_pokemons {
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        }
      }
      pokemon_v2_pokemonstats {
        id
        base_stat
        effort
        pokemon_v2_stat {
          is_battle_only
          move_damage_class_id
          name
          pokemon_v2_movedamageclass {
            name
          }
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
    pokemon_v2_generation {
      id
    }
  }
  `;
  const { data }: QueryData | any = await getClient().query({ query, variables: { variable: params.slug } });

  const image = JSON.parse(data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites[0]?.sprites);
  const type = data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name;

  return (
    <main className={`relative flex overflow-y-scroll overflow-x-hidden lg:overflow-y-hidden justify-center px-3 bg-gradient-to-t ${badgeColor[type]} h-[100%] sm:h-screen w-screen sm:w-full z-0`}>
      <AreaLayout data={data} type={type} />
    </main>
  );
}
