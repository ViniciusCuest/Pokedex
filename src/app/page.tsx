import React from 'react';
import { Cards } from '@/components/Cards';

export default function Home() {
  return (
    <main className='overflow-x-hidden'>
      <header className='flex border-b-[8px] h-20 w-full border-black_900 bg-gradient-to-r from-max_red to-min_red sm:border-b-[16px] sm:h-36'></header>
      <section className='pt-10 px-5 sm:pt-20 sm:pl-14 sm:pr-10'>
        <h1 className='text-3xl font-bold font-sans text-black_900 mb-4 sm:mb-8 sm:text-6xl'>Favoritos</h1>
        <div className='grid gap-4 gap-x-4 grid-cols-2'>
          <Cards></Cards>
          <Cards></Cards>
          <Cards></Cards>
          <Cards></Cards>
        </div>
      </section>
      <section></section>
    </main>
  );
}