'use client';
import { badgeColor } from "@/utils/color-components";
type Props = {
   title: string;
}
export function Badge({ title }: Props) {
   return (
      <div className={`flex justify-center items-center w-full h-4 rounded-lg bg-gradient-to-r ${badgeColor[title]} sm:w-20 sm:h-6`}>
         <h1 className='text-[.65rem] font-sans font-bold text-white sm:text-sm'>
            {
               title[0].toUpperCase() + title.substring(1)
            }
         </h1>
      </div>
   );
}
