'use client';
import { ResultDataProps } from '@/types/api.types';
import { Avatar } from '../Avatars';
import { Badge } from '../Badges';
import { Dispatch, ReactElement, SetStateAction, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdOutlineArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { cardColor } from '@/utils/color-components';
import { Variants, motion } from 'framer-motion';
import { useScrollLock } from '@/hooks/block-scroll';
type Props = {
  size?: 'small' | 'medium' | 'large';
  isFavorite?: boolean;
  selected: any
  setSelected: Dispatch<SetStateAction<number | null>>
  getLayoutSize?: Dispatch<SetStateAction<number>>;
  favorite: (key: number, generation: number) => void;
  unfavorite: (key: number) => void;
}

const variants: Variants = {
  open: {
    width: '35vw',
    height: '30vh',
    overflow: 'hidden',
    position: 'fixed',
    inset: 0,
    margin: 'auto',
    scale: 1.1,
    zIndex: 1000,
  },
  closed: {
    margin: '0px',
    scale: 1
  }
}
const variantsMobile: Variants = {
  open: {
    width: '85%',
    height: '30vh',
    overflow: 'hidden',
    position: 'fixed',
    inset: 0,
    margin: 'auto',
    scale: 1.1,
    zIndex: 1000,
  },
  closed: {
    margin: '0px',
    scale: 1
  }
}

export function Cards({
  id,
  name,
  pokemon_v2_pokemonspecy,
  pokemon_v2_pokemonsprites,
  pokemon_v2_pokemontypes,
  pokemon_v2_pokemonabilities,
  size = 'medium',
  isFavorite = false,
  selected,
  setSelected,
  favorite,
  unfavorite,
  getLayoutSize
}: ResultDataProps & Props): ReactElement {
  const cardSize: string = size === 'small' ?
    'w-28 p-0 flex-col justify-center h-40 sm:h-56 sm:w-[21rem]' :
    size === 'medium' ?
      'w-[calc((100% / 2) - (1.25rem * 2 + 1rem)] h-44 sm:w-96 sm:h-80'
      :
      'sm:w-[36rem] sm:h-[21rem]';

  const image = JSON.parse(pokemon_v2_pokemonsprites[0]?.sprites);
  const evolvesTo = pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.find(item => item.evolves_from_species_id == id);
  const type = pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name;

  const { blockScroll } = useScrollLock();

  return (
    <motion.section
      animate={selected === id ? "open" : "closed"}
      variants={window.screen.width < 670 ? variantsMobile : variants}
      layout
      transition={{ type: 'tween', duration: .3 }}
      onClick={() => {
        setSelected(id);
        blockScroll();
      }}
      onLoad={(e) => {
        if (getLayoutSize)
          getLayoutSize(e.currentTarget.clientWidth);
      }}
      onResize={(e) => {
        if (getLayoutSize)
          getLayoutSize(e.currentTarget.clientWidth);
      }}
      className={`relative flex bg-gradient-to-b ${cardColor[type]} shadow-lg  cursor-pointer p-2 rounded-lg ${cardSize} sm:rounded-lg sm:p-6`}
    >
      <button
        className='hidden sm:block absolute top-0 right-0 m-5'
        onClick={(e) => {
          e.preventDefault();
          if (!isFavorite) {
            favorite(id, pokemon_v2_pokemonspecy.pokemon_v2_generation.id);
            return;
          }
          unfavorite(id);
        }}
      >
        {
          isFavorite ?
            <AiFillStar className='w-9 h-9 fill-max_orange' />
            :
            <AiOutlineStar className='w-9 h-9 fill-white' />
        }
      </button>
      {
        selected === id &&
        <Link
          href={`/pokemon/${id}`}
          className='flex flex-row items-center text-base font-sans text-white font-bold absolute bottom-0 right-0 m-3 sm:m-5'
        >
          More info
          <MdOutlineArrowRight size={25} />
        </Link>
      }
      <section className='flex flex-row items-center justify-around'>
        <div>
          <span className='flex flex-row items-center'>
            <Avatar
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.other.dream_world.front_default).slice(6)}`}
            />
            {
              (size !== 'small' || window.screen.width > 630) &&
              <div
                className='flex flex-col mt-7 sm:mt-3 ml-1 space-y-1 sm:ml-3'
              >
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
                  className='flex flex-col space-y-1 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0'>
                  {
                    pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
                      <Badge key={String(pokemon_v2_type.id)} title={pokemon_v2_type.name} />
                    ))
                  }
                </div>
              </div>
            }
          </span>
          <h1 className='text-lg font-sans text-white font-bold sm:hidden'>
            {
              name[0].toUpperCase() + name.substring(1)
            }
          </h1>
          {
            size !== 'small' &&
            <section className='hidden sm:flex items-center gap-2'>
              <Avatar
                className='mt-3'
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.front_default).slice(6)}`}
                type={'small'}
              />
              <Avatar
                className='mt-3'
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.back_default).slice(6)}`}
                type={'small'}
              />
              <Avatar
                className='mt-3'
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.front_shiny).slice(6)}`}
                type={'small'}
              />
              <Avatar
                className='mt-3'
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.back_shiny).slice(6)}`}
                type={'small'}
              />
            </section>
          }
          <span className='flex flex-col sm:flex-row mt-0 sm:space-x-2 sm:mt-4'>
            <h3 className='text-sm sm:text-xl font-sans font-medium text-white'>Evolução: </h3>
            <p className='text-xs sm:text-xl font-sans font-bold text-white'>
              {
                !evolvesTo?.name ?
                  'Não há evolução'
                  :
                  String(evolvesTo?.name)[0].toUpperCase() + String(evolvesTo?.name).substring(1)
              }
            </p>
          </span>
        </div>
        {
          selected === id &&
          <ul className='flex flex-col space-y-2 overflow-auto'>
            {
              (!!pokemon_v2_pokemonabilities) &&
              pokemon_v2_pokemonabilities.map(item => (
                <li className='font-sans text-xs sm:text-sm text-white px-8'>
                  {
                    item.pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].short_effect
                  }
                </li>
              ))
            }
          </ul>
        }
      </section>
    </motion.section>
  );
}

