'use client';
import { ResultDataProps } from "@/types/api.types";
import { Avatar } from "../Avatars";
import { Badge } from "../Badges";
import { objType } from "@/types/color.props";
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type Props = {
  isLegendary?: boolean;
  getLayoutSize: Dispatch<SetStateAction<number>>
}

export function Cards({ id, name, pokemon_v2_pokemonspecy, pokemon_v2_pokemonsprites, pokemon_v2_pokemontypes, isLegendary, getLayoutSize }: ResultDataProps & Props): ReactElement {
  const cardColor: objType = {
    bug: 'bg-gradient-to-b from-max_cyan to-min_cyan',
    grass: 'bg-gradient-to-b from-max_green to-min_green',
    fire: 'bg-gradient-to-b from-max_orange to-min_orange',
    poison: 'bg-gradient-to-b from-max_purple to-min_purple',
    water: 'bg-gradient-to-b from-max_blue to-min_blue',
    flying: 'bg-gradient-to-b from-max_blue to-min_blue',
    normal: 'bg-gradient-to-b from-max_lightblue to-min_lightblue'
  }

  const image = JSON.parse(pokemon_v2_pokemonsprites[0]?.sprites);

  const evolvesTo = pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.find(item => item.evolves_from_species_id == id);

  const type = pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name;

  return (
    <section
      onLoad={(e) => {
        getLayoutSize(e.currentTarget.clientWidth);
      }}
      onResize={(e) => {
        getLayoutSize(e.currentTarget.clientWidth);
      }}
      className={!isLegendary ? `relative ${cardColor[type]} w-[calc((100% / 2) - (1.25rem * 2 + 1rem)] shadow-lg h-44 p-2 rounded-lg sm:rounded-lg sm:w-96 sm:h-80 sm:p-6` : ``}>
      <button className="absolute top-0 right-0 m-5">
        <AiFillStar className='w-9 h-9 fill-max_orange' />
      </button>
      <span className="flex flex-row justify-items-center items-center">
        {
          <Avatar src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.other.dream_world.front_default).slice(6)}`} />
        }

        <div
          className="flex flex-col mt-7 sm:mt-3 ml-1 space-y-1 sm:ml-3">
          <span className='flex items-center justify-center w-16 h-[1.1rem] rounded-md sm:h-6 mb-1 bg-white font-sans font-bold text-[.75rem] sm:text-base text-gray_700 sm:rounded-lg'>
            #{
              id
            }
          </span>
          <h1 className='hidden sm:font-sans font-semibold text-white sm:text-3xl sm:block'>
            {
              name[0].toUpperCase() + name.substring(1)
            }
          </h1>
          <div
            className="flex flex-col space-y-1 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0">
            {
              pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
                <Badge key={String(pokemon_v2_type.id)} title={pokemon_v2_type.name} />
              ))
            }
          </div>
        </div>
      </span>
      <section className="flex items-center gap-2">
        <Avatar className='mt-3' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.front_default).slice(6)}`} type={'small'} />
        <Avatar className='mt-3' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.back_default).slice(6)}`} type={'small'} />
        <Avatar className='mt-3' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.front_shiny).slice(6)}`} type={'small'} />
        <Avatar className='mt-3' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.back_shiny).slice(6)}`} type={'small'} />
      </section>
      <span className="flex flex-row space-x-2 mt-4">

        <h3 className='text-xl font-sans font-medium text-white'>Evolução: </h3>
        <p className="text-xl font-sans font-bold text-white">
          {
            !evolvesTo?.name ?
              'Não há evolução'
              :
              String(evolvesTo?.name)[0].toUpperCase() + String(evolvesTo?.name).substring(1)
          }
        </p>

      </span>
    </section>
  );
}

