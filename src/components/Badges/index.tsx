'use client';

import { colors } from "@/types/color.props";
import { useEffect } from "react";

type Props = {
   title: string;
}



export function Badge({ title }: Props) {


   useEffect(() => {
      console.log()
   }, []);


   return (
      <div className={`flex justify-center items-center w-14 h-4 rounded-lg ${colors.badge[title]} `}>
         <h1 className='text-[.75rem] font-sans font-bold text-white'>
            {
               title[0].toUpperCase() + title.substring(1)
            }
         </h1>
      </div>
   );
}