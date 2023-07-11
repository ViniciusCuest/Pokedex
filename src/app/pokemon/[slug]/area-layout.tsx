'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageContainer } from '../image';
import { Family } from './family';
import Image from 'next/legacy/image';
import { BluredWrapper } from './blured-wrapper';
import { Graph } from '@/components/Graph';
import { BackgroundShape } from '@/components/BackgroundShape';
import { badgeColor } from '@/utils/color-components';
import { useScrollLock } from '@/hooks/block-scroll';

export function AreaLayout({ data, type }: any) {
  const { activateScroll } = useScrollLock();

  const image = JSON.parse(data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonsprites[0]?.sprites);
  console.log();
  useEffect(() => {
    activateScroll();
  }, []);

  return (
    <>
      <BackgroundShape />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .05, type: 'tween' }}
        className='grid w-full px-2 gap-8 grid-areas-slim grid-cols-1 lg:grid-cols-layout lg:grid-areas-medium xl:grid-areas-wide lg:px-8'
      >
        <section
          className='flex flex-col user-select justify-center items-center grid-in-cover mt-96 sm:mt-32'>
          <ImageContainer
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/${String(image?.other.dream_world.front_default || image.other.home.front_default || image.other['official-artwork'].front_default).slice(6)}`}
            {...data.pokemon_v2_pokemon_by_pk}

          />
          <Image fetchPriority='high' className='fixed z-[-3] top-0 mb-[20rem] sm:absolute sm:right-0 ml-[5rem] rotate-[30deg] opacity-[.08] select-none' priority layout='fill' src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${type}.svg`} />
        </section>
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, type: 'tween' }}
          className='relative flex flex-col justify-center items-center w-full grid-in-stats lg:flex-row lg:gap-x-8 lg:justify-between xl:gap-x-0 xl:justify-center xl:flex-col xl:mt-48 space-y-8 sm:space-y-8'
        >
          <BluredWrapper styles='w-full pt-2 h-20 sm:pt-0 sm:h-auto xl:w-[28rem] lg:mb-5 xl:mb-0'>
            <div className='p-0 sm:px-9 sm:py-5'>
              <div className='flex flex-row items-center justify-around sm:justify-between'>
                <span className='text-center'>
                  <h5 className='font-sans font-bold text-white text-xl'>
                    {
                      data.pokemon_v2_pokemon_by_pk.height + 'm'
                    }
                  </h5>
                  <p className='font-sans font-normal text-white text-base'>Height</p>
                </span>
                <span className='text-center'>
                  <div className='flex flex-row items-center gap-1'>
                    {
                      data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes.map((item: any) => {
                        return (
                          <div
                            key={item.id}
                            className={`p-2 rounded-full bg-gradient-to-t ${badgeColor[item.pokemon_v2_type.name]}`}
                          >
                            <span className='flex relative w-7 h-7'>
                              <Image priority layout='fill' src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${item.pokemon_v2_type.name}.svg`} />
                            </span>
                          </div>
                        )
                      })
                    }
                  </div>
                  <p className='font-sans font-normal text-white text-base'>Type(s)</p>
                </span>
                <span className='text-center'>
                  <h5 className='font-sans font-bold text-white text-xl'>
                    {
                      data.pokemon_v2_pokemon_by_pk.weight + 'kg'
                    }
                  </h5>
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
                    priority
                  />
                </figure>
              </div>
            </div>
          </BluredWrapper>
          <BluredWrapper styles='w-full mt-0 xl:w-auto'>
            <Graph pokeType={type} data={data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonstats} />
          </BluredWrapper>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, type: 'tween' }}
          className={
            'relative flex flex-col justify-end items-center w-full sm:flex-row xl:w-auto grid-in-family [&>*:nth-child(1)]:order-2 [&>*:nth-child(2)]:order-1 sm:[&>*:nth-child(1)]:order-1 sm:[&>*:nth-child(2)]:order-2 lg:mt-36 xl:mt-0'
          }>
          <h1 className='font-sans text-base my-6 sm:text-xl xl:mt-32  text-white font-semibold px-8 2xl:mt-[20%]'>
            {
              data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonabilities[0].pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].effect
            }
          </h1>
          <BluredWrapper styles='w-full xl:mt-0 xl:w-36 sm:flex sm:justify-center'>
            <Family
              data={data}
              image={image}
            />
          </BluredWrapper>
        </motion.section>
      </motion.section>
    </>
  )
}
