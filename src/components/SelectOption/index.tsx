'use client';
import { GenerationProps } from '@/types/api.types';
import { Variants, motion } from 'framer-motion';
import { useState } from 'react';
import { GrMapLocation } from 'react-icons/gr';
import { MdCatchingPokemon } from 'react-icons/md'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config';
import { useLocalData } from '@/context/local-provider';

const fullConfig: any = resolveConfig(tailwindConfig);

const variants: Variants = {
  open: {
    opacity: 1,
    y: -0,
  },
  closed: {
    opacity: 0,
    y: -10
  }
}

export function SelectOption({ data }: { data: GenerationProps[]; }) {
  const [open, setOpen] = useState<boolean>(false);
  const { generationId, handleChangeGenerationId } = useLocalData();
  return (
    <div className='relative mr-4 bg-max_red w-64 rounded-lg cursor-pointer select-none'>
      <div
        className='p-2 flex flex-row items-center justify-between'
        onClick={() => {
          setOpen(prev => !prev);
        }}>
        <label className='cursor-pointer font-sans text-lg font-semibold text-white'>
          {
            data.find(item => item.id === generationId)?.pokemon_v2_generationnames[0].name
          }
        </label>
        <MdCatchingPokemon color={`${fullConfig?.theme?.colors.black_900}`} size={20} />
      </div>
      <motion.ul
        variants={variants}
        animate={open ? 'open' : 'closed'}
        transition={{
          duration: .1,
          ease: 'easeIn'
        }}
        className={`${open ? 'flex' : 'hidden'} mt-2 rounded-lg flex-col flex-grow-0 absolute z-50 mr-5 bg-white w-full shadow-lg`}>
        {
          data.map((item) => (
            <li
              key={item.id}
              value={item.id}
              className='flex flex-grow flex-row text-center p-2 items-center justify-around font-sans text-lg border-t-[1px] gap-x-2 border-background'
              onClick={(evt) => {
                evt.preventDefault();
                handleChangeGenerationId(+evt.currentTarget.value);
                setOpen(false);
              }}
            >
              <span className='text-black_900'>
                {
                  item.pokemon_v2_generationnames[0].name
                }
              </span>
              -
              <span className='flex flex-row items-center gap-x-2'>
                <GrMapLocation color={`${fullConfig?.theme?.colors.black_900}`} size={20} />
                {
                  item.pokemon_v2_region.pokemon_v2_regionnames[0]?.name
                }
              </span>
            </li>
          ))
        }
      </motion.ul>
    </div>
  )
}
