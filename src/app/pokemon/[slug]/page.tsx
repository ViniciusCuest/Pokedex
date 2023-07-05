import { BackgroundShape } from '@/components/BackgroundShape';
import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';
import { ImageContainer } from '../image';
import { Family } from './family';
import Image from 'next/legacy/image';
import { BluredWrapper } from './blured-wrapper';
import { Graph } from '@/components/Graph';
import { badgeColor, cardColor, pokeTypeColor } from '@/utils/color-components';

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
      base_experience
      order
      pokemon_species_id
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
  }
  `;
  const { data }: QueryData | any = await getClient().query({ query, variables: { variable: params.slug } });

  const image = JSON.parse(data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites[0]?.sprites);
  const type = data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name;



  return (
    <main className={`relative flex overflow-y-scroll overflow-x-hidden lg:overflow-y-hidden justify-center px-3 sm:justify-center bg-gradient-to-t ${badgeColor[type]} h-[100%] sm:h-screen w-screen sm:w-full z-0`}>
      <BackgroundShape />
      <section className='grid w-full px-2 gap-8 grid-areas-slim grid-cols-1 lg:grid-cols-layout lg:grid-areas-wide lg:px-8'>
        <section className='flex flex-col justify-center items-center grid-in-cover mt-96 sm:mt-32'>
          <ImageContainer
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.other.dream_world.front_default).slice(6)}`}
            {...data.pokemon_v2_pokemon_by_pk}
          />
        </section>
        <section className='relative flex flex-col justify-center items-center w-full grid-in-stats sm:mt-48 space-y-8 sm:space-y-8'>
          <BluredWrapper styles='w-full pt-4 h-20 sm:pt-0 sm:h-auto xl:w-[28rem]'>
            <div className='p-0 sm:px-9 sm:py-5'>
              <div className='flex flex-row items-center justify-around sm:justify-between'>
                <span className='text-center'>
                  <h5 className='font-sans font-bold text-white text-xl'>1m</h5>
                  <p className='font-sans font-normal text-white text-base'>Height</p>
                </span>
                <span className='text-center'>
                  <h5 className='font-sans font-bold text-white text-xl'>1m</h5>
                  <p className='font-sans font-normal text-white text-base'>Height</p>
                </span>
                <span className='text-center'>
                  <h5 className='font-sans font-bold text-white text-xl'>1kg</h5>
                  <p className='font-sans font-normal text-white text-base'>Weight</p>
                </span>
              </div>
              <div className='hidden sm:flex sm:flex-row sm:justify-between sm:items-center mt-9'>
                <span className='flex flex-col'>
                  <p className='text-5xl font-sans font-bold opacity-[.2] text-white'>
                    #{
                      data.pokemon_v2_pokemon_by_pk.id
                    }
                  </p>
                  <h3 className='text-white font-sans font-bold text-3xl'>
                    Evolves to:
                  </h3>
                </span>
                <figure className='relative w-32 h-32'>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.other.dream_world.front_default).slice(6)}`}
                    layout='fill'
                  />
                </figure>
              </div>
            </div>
          </BluredWrapper>
          <BluredWrapper styles='w-full mt-0 sm:w-auto'>
            <Graph pokeType={type} data={data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats} />
          </BluredWrapper>
        </section>
        <section className='relative flex justify-end items-center w-full xl:w-auto grid-in-family'>
          <BluredWrapper styles='w-full xl:mt-20 xl:w-36 sm:flex sm:justify-center'>
            <Family
              data={data}
              image={image}
            />
          </BluredWrapper>
        </section>
      </section>
    </main >
  );
}
