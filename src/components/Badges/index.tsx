'use client';

import { objType } from "@/types/color.props";
import { useEffect } from "react";

type Props = {
   title: string;
}

export function Badge({ title }: Props) {

   const badgeColor: objType = {
      bug: 'bg-gradient-to-r from-bug1 to-bug2',
      grass: 'bg-gradient-to-r from-grass1 to-grass2',
      fire: 'bg-gradient-to-r from-fire1 to-fire2',
      poison: 'bg-gradient-to-r from-max_purple to-min_purple',
      water: 'bg-gradient-to-r from-water1 to-water2',
      flying: 'bg-gradient-to-r from-max_blue to-min_blue',
      normal: 'bg-gradient-to-r from-normall to-normal2'
   }

   useEffect(() => {
      console.log()
   }, []);


   return (
      <div className={`flex justify-center items-center w-14 h-4 rounded-lg ${badgeColor[title]} sm:w-20 sm:h-6`}>
         <h1 className='text-[.75rem] font-sans font-bold text-white sm:text-sm'>
            {
               title[0].toUpperCase() + title.substring(1)
            }
         </h1>
      </div>
   );
}