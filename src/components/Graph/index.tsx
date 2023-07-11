'use client'

import { pokeTypeColor } from "@/utils/color-components";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config';

const fullConfig: any = resolveConfig(tailwindConfig);

export function Graph({ data, pokeType }: any) {
  return (
    <div className=" px-4 py-2 sm:px-6 sm:py-5 space-y-1 xl:w-[26rem]">
      {
        data.map((item: { id: number; base_stat: number; pokemon_v2_stat: { name: string } }) => {
          return (
            <div key={item.id} className="grid grid-cols-3 items-center">
              <h4 className="font-sans text-lg text-white text-left">
                {
                  item.pokemon_v2_stat.name.includes('special-') ?
                    `Sp. ${item.pokemon_v2_stat.name.substring('special-'.length)[0].toUpperCase()}${item.pokemon_v2_stat.name.substring('special-'.length + 1)}`
                    : `${item.pokemon_v2_stat.name[0].toUpperCase()}${item.pokemon_v2_stat.name.substring(1)}`
                }
              </h4>
              <div
                style={{
                  backgroundColor: fullConfig?.theme?.colors[`${pokeTypeColor[pokeType]}`]
                }}
                className={`w-40 h-4 sm:h-5 sm:w-48 rounded-2xl z-0 relative`}>
                <span
                  style={{
                    width: `${item.base_stat}%`
                  }}
                  className={`absolute h-full bg-white opacity-90 z-10 rounded-xl max-w-full`}
                />
              </div>
              <p className="font-sans text-xl text-white font-bold text-right">
                {
                  item.base_stat
                }
              </p>
            </div>
          );
        })
      }
    </div >
  );
}
