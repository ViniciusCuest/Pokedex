'use client';
import { ResultDataProps } from "@/types/api.types";
import { Avatar } from "../Avatars";
import { Badge } from "../Badges";
import { colors } from "@/types/color.props";

export function Cards({ name, types }: ResultDataProps) {

   return (
      <div
         className={`${colors.cards[types[0].type.name]} w-[calc((100% / 2) - (1.25rem * 2 + 1rem)] h-44 p-2 rounded-lg sm:rounded-lg sm:w-96 sm:h-80`}>
         <span className="flex flex-row justify-items-center items-center">
            <Avatar />
            <div className="flex flex-col mt-3 ml-1 space-y-1">
               <h1 className='text-xs font-sans font-semibold text-white'>
                  {
                     name[0].toUpperCase() + name.substring(1)
                  }
               </h1>
               {
                  types.map(({ type }, _id: number) => (
                     <Badge key={String(_id)} title={type.name} />
                  ))
               }
            </div>
         </span>
      </div>
   );
}

