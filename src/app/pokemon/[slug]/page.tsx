import { BackgroundShape } from '@/components/BackgroundShape';
import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';
import { ImageContainer } from '../image';
import { Family } from './family';
import Image from 'next/legacy/image';
import { BluredWrapper } from './blured-wrapper';

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
  }
}

export default async function Pokemon({ params }: Props) {
  const query = gql` {
    pokemon_v2_pokemon_by_pk(id: ${params.slug}) {
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
  const { data }: QueryData | any = await getClient().query({ query });
  const image = JSON.parse(data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites[0]?.sprites);
  return (
    <main className='flex items-center justify-center bg-max_blue h-[100vh] w-full z-0'>
      <BackgroundShape />
      <section className='grid w-full px-3 gap-8 grid-areas-slim sm:grid-cols-layout sm:grid-areas-wide sm:px-8'>
        <section className='grid-in-cover mt-32'>
          <ImageContainer
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.other.dream_world.front_default).slice(6)}`}
            {...data.pokemon_v2_pokemon_by_pk}
          />
        </section>
        <section className='grid-in-stats'>
          <BluredWrapper>
            <div className='px-9 py-5 w-[30rem]'>
              <div className='flex flex-row w-full items-center justify-around sm:justify-between sm:space-x-0'>
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
              <div className='flex flex-row justify-between items-center mt-9'>
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
        </section>
        <section className='relative grid-in-family'>
          <BluredWrapper>
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
