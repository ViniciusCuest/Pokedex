'use client';

import Image from 'next/legacy/image';
export function Family({ data, image }: any) {
  console.log(data);
  const family: [] = data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies;
  return (
    <div className='relative flex flex-row items-center justify-around px-4 py-3 rounded-xl sm:flex-col sm:w-11'>
      {
        family.map((item: any) => {
          const itemImage = JSON.parse(item.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites);
          return (
            <figure
              key={String(item.id)}
              className={'flex flex-col items-center justify-end'}
            >
              <div className='relative w-20 h-24'>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(itemImage.other.dream_world.front_default).slice(6)}`}
                  layout='fill'
                />
              </div>
              <figcaption className='font-sans text-xl sm:text-2xl text-white mt-1 sm:mb-5'>
                {
                  item.name
                }
              </figcaption>
            </figure>
          );
        })
      }
    </div>
  )
}
