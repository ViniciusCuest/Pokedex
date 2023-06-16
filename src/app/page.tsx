import { Cards } from '@/components/Cards';
import { ScrollContainer } from '@/components/ScrollContainer';
import { useState } from 'react';

export default async function Home() {

  const data = await getPokemonData();
  
  return (
    <main className='overflow-x-hidden'>
      <header className='flex border-b-[8px] h-20 w-full border-black_900 bg-gradient-to-r from-max_red to-min_red sm:border-b-[16px] sm:h-36'></header>
      <ScrollContainer data={data}/>
      <section className='mt-24 px-5 sm:pt-20 sm:pl-14 sm:pr-10'>
        <h1 className='text-3xl font-bold font-sans text-black_900 mb-4 sm:mb-8 sm:text-6xl'>Lendários</h1>
      </section>
    </main>
  );
}

async function getPokemonData() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon', {
    cache: 'no-store'
  });
  return response.json();
}