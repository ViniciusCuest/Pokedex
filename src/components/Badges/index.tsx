'use client';

import { objType } from "@/types/color.props";
import { useEffect } from "react";

type Props = {
   title: string;
}

export function Badge({ title }: Props) {

   const badgeColor: objType = {
      bug: 'from-bug1 to-bug2',
      grass: 'from-grass1 to-grass2',
      fire: 'from-fire1 to-fire2',
      poison: 'from-max_purple to-min_purple',
      water: 'from-water1 to-water2',
      flying: 'from-max_blue to-min_blue',
      normal: 'from-normall to-normal2',
      rock: 'from-max_rock to-min_rock'
   }

   return (
      <div className={`flex justify-center items-center w-14 h-4 rounded-lg bg-gradient-to-r ${badgeColor[title]} sm:w-20 sm:h-6`}>
         <h1 className='text-[.75rem] font-sans font-bold text-white sm:text-sm'>
            {
               title[0].toUpperCase() + title.substring(1)
            }
         </h1>
      </div>
   );
}
