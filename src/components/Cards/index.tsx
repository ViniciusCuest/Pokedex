'use client';
import { ResultDataProps } from '@/types/api.types';
import { Avatar } from '@/components/Avatars';
import { Badge } from '@/components/Badges';
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdOutlineArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { cardColor } from '@/utils/color-components';
import { Variants, motion } from 'framer-motion';
import { useScrollLock } from '@/hooks/block-scroll';
import { useRouter } from 'next/navigation';

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
    width: '40%',
    height: '30vh',
    overflow: 'hidden',
    position: 'fixed',
    inset: 0,
    margin: 'auto',
    scale: 1.1,
    zIndex: 1000,
  },
  closed: {
    margin: 0,
    scale: 1
  }
}
const variantsTablet: Variants = {
  open: {
    width: '70%',
    height: '35vh',
    overflow: 'hidden',
    position: 'fixed',
    inset: 0,
    margin: 'auto',
    padding: 16,
    scale: 1.1,
    zIndex: 1000,
  },
  closed: {
    margin: 0,
    scale: 1,
  }
}
const variantsMobile: Variants = {
  open: {
    width: '85%',
    height: '45vh',
    overflow: 'hidden',
    position: 'fixed',
    inset: 0,
    margin: 'auto',
    padding: 16,
    scale: 1.1,
    zIndex: 1000,
  },
  closed: {
    margin: 0,
    scale: 1,
  }
}

export const cardSize: { small: string; medium: string; large: string; } = {
  small: 'w-[calc((100vw_/_3)_-_16px)] p-0 flex-col sm:justify-center h-40 sm:h-56 sm:w-[calc((100vw_/_4)_-_24px)] lg:w-[calc((100vw_/_3)_-_32px)] xl:w-[20.8rem] 2xl:w-[21rem]',
  medium: 'w-[calc((100%_/_2)_-_(1.25rem_*_2_+_1rem)] h-44 sm:w-96 sm:h-80',
  large: 'sm:w-[36rem] sm:h-[21rem]'
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

  const image = JSON.parse(pokemon_v2_pokemonsprites[0]?.sprites);
  const evolvesTo = pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.find(item => item.evolves_from_species_id == id);
  const type = pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name;


  const { blockScroll } = useScrollLock();

  const route = useRouter();

  const [windowClient, setWindowClient] = useState<any>({ width: 0 });

  useEffect(() => {
    setWindowClient(window.screen);
  }, []);

  return (
    <motion.section
      animate={selected === id ? "open" : "closed"}
      variants={windowClient.width < 768 ?
        variantsMobile :
        windowClient.width < 1024 ?
          variantsTablet :
          variants
      }
      layout
      transition={{ type: 'tween', duration: .3 }}
      onLoad={(e) => {
        if (getLayoutSize)
          getLayoutSize(e.currentTarget.clientWidth);
      }}
      onResize={(e) => {
        if (getLayoutSize)
          getLayoutSize(e.currentTarget.clientWidth);
      }}
      className={`relative flex items-center overflow-hidden justify-center bg-gradient-to-b ${cardColor[type]} shadow-lg  cursor-pointer p-2 rounded-lg ${cardSize[size]} sm:rounded-lg sm:p-6`}
      data-testid="card-container"
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
      <section
        className='flex flex-col md:flex-row justify-normal items-center sm:justify-around'
        onClick={(e) => {
          e.preventDefault();
          if (size !== 'small') {
            route.push(`/pokemon/${id}`);
            return;
          }
          setSelected(id);
          blockScroll();
        }}
      >
        <div className={`${selected === id && 'flex flex-col'}`}>
          <span className='flex flex-row items-center'>
            <Avatar
              scale={selected === id}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image.other.dream_world.front_default || image.other.home.front_default || image.other['official-artwork'].front_default).slice(6)}`}
            />
            <div
              className={`${size === 'small' ? 'hidden' : 'flex'} lg:flex flex-col mt-0 sm:mt-3 ml-1 space-y-1 sm:ml-3`}
            >
              <span className='flex items-center justify-center w-10 sm:w-16 h-[1.1rem] rounded-md sm:h-6 mb-1 bg-white font-sans font-bold text-[.75rem] sm:text-base text-gray_700 sm:rounded-lg'>
                #{
                  id
                }
              </span>
              <h1 className='hidden lg:font-sans font-semibold text-white lg:text-3xl lg:block'>
                {
                  name[0].toUpperCase() + name.substring(1)
                }
              </h1>
              <div
                className='flex flex-col space-y-1 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0'>
                {
                  pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
                    <Badge key={String(pokemon_v2_type.id)} title={pokemon_v2_type.name} />
                  ))
                }
              </div>
            </div>
          </span>
          <h1 className={`${selected === id ? 'text-xl mt-2' : 'text-base'} font-sans text-white font-bold lg:hidden`}>
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
          <span className={`flex ${selected === id ? 'flex-row space-x-2' : 'flex-col space-x-0'} lg:flex-row mt-0 lg:space-x-2 lg:mt-4`}>
            <h3 className={`${selected === id ? 'text-base' : 'text-xs'} sm:text-sm lg:text-xl font-sans font-medium text-white`}>Evolution: </h3>
            <p className={`${selected === id ? 'text-base' : 'text-xs'} sm:text-sm lg:text-xl font-sans font-bold text-white`}>
              {
                !evolvesTo?.name ?
                  'No evolution'
                  :
                  String(evolvesTo?.name)[0].toUpperCase() + String(evolvesTo?.name).substring(1)
              }
            </p>
          </span>
        </div>
        {
          selected === id &&
          <ul className='flex flex-col space-y-2 mt-3 justify-center overflow-auto sm:mt-0 pl-8'>
            {
              (!!pokemon_v2_pokemonabilities) &&
              pokemon_v2_pokemonabilities.map(item => (
                <li
                  key={item.id}
                  className='font-sans text-sm sm:text-sm text-white'
                >
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

