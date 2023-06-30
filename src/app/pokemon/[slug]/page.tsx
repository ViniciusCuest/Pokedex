import { BackgroundShape } from '@/components/BackgroundShape';
import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';
import { ImageContainer } from '../image';

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
    <main className='flex items-center justify-center bg-max_green h-[100vh] w-full z-0'>
      <BackgroundShape />
      <section className=''>
        <ImageContainer
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.other.dream_world.front_default).slice(6)}`}
          {...data.pokemon_v2_pokemon_by_pk}
        />
        <div>
          <div className='flex flex-row items-center justify-between'>
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
        </div>
      </section>
    </main>
  );
}
