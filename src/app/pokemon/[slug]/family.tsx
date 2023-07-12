'use client';

import Image from 'next/legacy/image';
export function Family({ data, image }: any) {
  const family: [] = data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies;
  return (
    <div className='relative flex flex-row items-center justify-around px-4 py-3 sm:space-x-12 rounded-xl lg:flex-col md:space-x-0 md:w-full'>
      {
        family.map((item: any) => {
          const itemImage = JSON.parse(item.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites);
          return (
            <figure
              key={item.id}
              className={'flex flex-col items-center justify-end xl:justify-around'}
            >
              <div className='relative w-20 h-24'>
                <Image
                  priority
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(itemImage.other.dream_world.front_default || itemImage.other.home.front_default || itemImage.other['official-artwork'].front_default).slice(6)}`}
                  layout='fill'
                  alt={`Image of the Pokemon - ${item.name}`}
                />
              </div>
              <figcaption className='font-sans text-xl sm:text-2xl text-white mt-1 sm:mb-5'>
                {
                  item.name[0].toUpperCase() + item.name.substring(1)
                }
              </figcaption>
            </figure>
          );
        })
      }
    </div>
  )
}
