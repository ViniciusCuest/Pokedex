'use client';

import { useEffect, useRef, useState } from "react";
import { Cards } from "../Cards";
import { DataProps, ResultDataProps } from "@/types/api.types";
import { Pokedex } from "../Pokedex";

export function ScrollContainer({ data }: DataProps) {
  const scrollComponentRef = useRef<HTMLDivElement>(null);

  const cardsGap: number = 44; //2.75rem + 10px

  const [search, setSearch] = useState<string>('');

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [maxScrollableLength, setMaxScrollableLength] = useState<number>(0);
  const [currentCardWidth, setCurrentCardWidth] = useState<number>(0);

  const handleChangeAppearingList = (next: boolean = false) => {
    const toIndex: number = next ? currentIndex + 1 : currentIndex - 1;
    scrollComponentRef.current?.scrollTo({
      behavior: 'smooth',
      left: (currentCardWidth + cardsGap) * (toIndex * 3)
    });
    setCurrentIndex(toIndex);
  }
  //.filter((i, index) => { return index >= data.length - 10 }).reverse()
  return (
    <main>
      <h1 className='text-3xl font-bold font-sans text-black_900 mb-4 sm:mb-8 sm:text-6xl sm:absolute sm:ml-10 sm:mt-4'>Favoritos</h1>
      <section
        ref={scrollComponentRef}
        onLoad={(e) => {
          setMaxScrollableLength(e.currentTarget.scrollWidth)
        }}
        className='relative pt-10 px-5 sm:pt-32 sm:mt-14 sm:pl-14 sm:pr-[34rem] sm:mr-9 sm:overflow-x-scroll sm:overflow-y-hidden'>
        <div
          onLoad={(e) => {
            const { clientWidth } = e.currentTarget;
            console.log('Width: ', clientWidth)
          }}
          className='grid w-auto gap-4 gap-x-4 grid-cols-2 sm:flex sm:flex-row sm:gap-x-11 sm:min-w-fit sm:p-5 sm:ml-[-.9rem]'>
          {
            data.filter((item: ResultDataProps) => String(item.id) === search ||
              item.name.toLowerCase().includes(search.toLowerCase())).map((item: ResultDataProps) => {
                return (
                  <Cards getLayoutSize={setCurrentCardWidth} key={String(item.id)} {...item} />
                )
              })
          }
        </div>
      </section>
      <Pokedex
        changeScrollPosition={handleChangeAppearingList}
        search={setSearch}
      />
    </main>

  );
}
