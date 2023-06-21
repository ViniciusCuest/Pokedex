import { ScrollContainer } from '@/components/ScrollContainer';
import { DataProps } from '@/types/api.types';
import Image from 'next/legacy/image';
import Pokeball from '../../public/assets/pokeball.png'
import Logo from '../../public/assets/pokemon-logo.png'
export default async function Home() {
  const data: DataProps[] | any = await getPokemonData();

  return (
    <main className='overflow-x-hidden'>
      <header className='flex justify-center flex-col items-center z-50 border-b-[8px] shadow-xl h-20 w-full border-black_900 bg-gradient-to-r from-max_red to-min_red sm:border-b-[16px] sm:h-36'>
        <Image layout='fixed' src={Logo} />
        <Image layout='fixed' src={Pokeball} />
      </header>
      <ScrollContainer data={data} />
      <section className='mt-24 px-5 sm:pt-20 sm:pl-14 sm:pr-10'>
        <h1 className='text-3xl font-bold font-sans text-black_900 mb-4 sm:mb-8 sm:text-6xl'>Lendários</h1>
      </section>
    </main>
  );
}

async function getPokemonData(): Promise<DataProps[]> {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon', {
    cache: 'no-store'
  });
  const { results } = await response.json();

  const data = await Promise.all(
    results.map(async (pokemon: any) => {
      const response = await fetch(`${pokemon.url}`);
      const body = await response.json();
      return {
        ...body,
        evolve: await (
          await fetch(`https://pokeapi.co/api/v2/evolution-chain/${body?.id}/`)
        ).json()
      };
    })
  );

  return data;
}