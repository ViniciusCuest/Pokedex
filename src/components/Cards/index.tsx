'use client';
import { ResultDataProps } from "@/types/api.types";
import { Avatar } from "../Avatars";
import { Badge } from "../Badges";
import { objType } from "@/types/color.props";

export function Cards({ name, types, sprites }: ResultDataProps) {
   const cardColor: objType = {
      bug: 'bg-gradient-to-b from-max_cyan to-min_cyan',
      grass: 'bg-gradient-to-b from-max_green to-min_green',
      fire: 'bg-gradient-to-b from-max_orange to-min_orange',
      poison: 'bg-gradient-to-b from-max_purple to-min_purple',
      water: 'bg-gradient-to-b from-max_blue to-min_blue',
      flying: 'bg-gradient-to-b from-max_blue to-min_blue',
      normal: 'bg-gradient-to-b from-max_lightblue to-min_lightblue'
   }

   return (
      <div
         className={`${cardColor[types[0].type.name]} w-[calc((100% / 2) - (1.25rem * 2 + 1rem)] shadow-lg h-44 p-2 rounded-lg sm:rounded-lg sm:w-96 sm:h-80 sm:p-6`}>
         <span className="flex flex-row justify-items-center items-center">
            <Avatar src={`${sprites?.other.dream_world.front_default}`} />
            <div
               className="flex flex-col mt-3 ml-1 space-y-1 sm:ml-3">
               <h1 className='text-xs font-sans font-semibold text-white sm:text-3xl'>
                  {
                     name[0].toUpperCase() + name.substring(1)
                  }
               </h1>
               <div
                  className="flex flex-col space-y-1 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0">
                  {
                     types.map(({ type }, _id: number) => (
                        <Badge key={String(_id)} title={type.name} />
                     ))
                  }
               </div>
            </div>
         </span>
         <Avatar className='mt-3' src={`${sprites?.other.dream_world.front_default}`} type={'small'}/>
      </div>
   );
}

