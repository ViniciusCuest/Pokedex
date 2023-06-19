'use client';

import { useEffect } from "react";
import { Cards } from "../Cards";
import { DataProps, ResultDataProps } from "@/types/api.types";

export function ScrollContainer({ data }: DataProps) {

   return (
      <section
         className='relative pt-10 px-5 sm:pt-20 sm:mt-20 sm:pl-14 sm:pr-10 sm:overflow-x-scroll'>
         <h1 className='text-3xl font-bold font-sans text-black_900 mb-4 sm:mb-8 sm:text-6xl sm:fixed sm:mt-[-6rem]'>Favoritos</h1>
         <div className='grid w-auto gap-4 gap-x-4 grid-cols-2 sm:flex sm:flex-row sm:gap-x-11 sm:min-w-fit sm:overflow-x-scroll'>
            {
               data.map((item: ResultDataProps) => (
                  <Cards key={String(item.id)} {...item} />
               ))
            }
         </div>
      </section>
   );
}