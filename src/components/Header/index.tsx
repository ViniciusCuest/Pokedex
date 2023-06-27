'use client';
import Image from 'next/image';
import Pokeball from '../../../public/assets/pokeball.png'
import Logo from '../../../public/assets/pokemon-logo.png'
import { useEffect } from 'react';
export function Header({ data }: any) {
  useEffect(() => {
    console.log(data.poke)
  }, []);
  return (
    <header className='flex justify-center flex-col items-center z-50 border-b-[8px] shadow-xl h-20 w-full border-black_900 bg-gradient-to-r from-max_red to-min_red sm:border-b-[16px] sm:h-36' >
      <Image className='absolute w-44 mt-6 sm:w-80 z-10' priority alt='pokemon' src={Logo} />
      <Image className='absolute w-20 mt-[7rem] rotate-[30deg] sm:mt-[12.5rem] sm:w-32' priority alt='logo' src={Pokeball} />
    </header>
  )
}
