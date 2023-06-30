'use client'
import { useRef, useState, useEffect } from 'react';
import { Cards } from '../Cards';
import { DataProps, ResultDataProps } from '@/types/api.types';
import { Pokedex } from '../Pokedex';

type Props = {
  legendary?: boolean;
  title: string;
}

export function VerticalContainer({ data, legendary = false, title }: DataProps & Props) {
  const scrollComponentRef = useRef<HTMLDivElement>(null);

  const cardsGap: number = 44; //2.75rem + 10px

  const [search, setSearch] = useState<string>('');

  const [favorites, setFavorites] = useState<any>([]);
  const [_data, setData] = useState(data);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentCardWidth, setCurrentCardWidth] = useState<number>(0);

  const handleChangeAppearingList = (next: boolean = false) => {
    const toIndex: number = next ? currentIndex + 1 : currentIndex - 1;
    scrollComponentRef.current?.scrollTo({
      behavior: 'smooth',
      left: toIndex <= 1 ? (currentCardWidth * 3 + (cardsGap * 3 + 18)) * toIndex : (currentCardWidth * 3 + (cardsGap * 3)) * toIndex + 17
    });
    setCurrentIndex(toIndex);
  }

  const handleFavoriteCard = (id: number) => {
    window.localStorage.setItem('@POKEDEX:FAVORITES',
      JSON.stringify([
        ...favorites, {
          pokemonId: id,
        }
      ]));

    setFavorites((prev: any) => [
      ...prev, {
        pokemonId: id,
      }]);

  }


  //.filter((i, index) => { return index >= data.length - 10 }).reverse()
  return (
    <section>
      <h1 className='text-3xl font-bold font-sans mt-12 ml-4 text-black_900 mb-4 sm:mb-8 sm:text-6xl sm:absolute sm:ml-10 sm:mt-4'>
        {
          title
        }
      </h1>
      <section
        ref={scrollComponentRef}
        className='relative pt-3 px-5 sm:pt-32 sm:mt-14 sm:pl-14 sm:pr-[37rem] sm:mr-9 sm:overflow-x-scroll sm:overflow-y-hidden select-none'>
        <div
          className='grid w-auto gap-4 gap-x-4 grid-cols-2 sm:flex sm:flex-row sm:gap-x-11 sm:min-w-fit sm:p-5 sm:ml-[-.9rem]'>
          {
            _data?.filter((item: ResultDataProps) => String(item.id) === search ||
              item.name.toLowerCase().includes(search.toLowerCase())).map((item: ResultDataProps) => {
                return (
                  <Cards
                    getLayoutSize={setCurrentCardWidth}
                    key={String(item.id)}
                    isFavorite={false}
                    favorite={handleFavoriteCard}
                    size={legendary ? 'large' : 'medium'}
                    {...item}
                  />
                )
              })
          }
        </div>
      </section>
      {
        (!legendary) &&
        <Pokedex
          changeScrollPosition={handleChangeAppearingList}
          search={setSearch}
        />
      }
    </section>
  );
}
