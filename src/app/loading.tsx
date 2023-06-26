'use client'
import Lottie from "lottie-react";
import PokeLottie from '../../public/67858-pokemon.json';
export default function Loading({src}:any) {
   console.log(src);
   return (
      <main className='flex items-center justify-center bg-black_900 w-full h-[100vh]'>
         <Lottie className="w-56 h-56" loop animationData={PokeLottie} />
      </main>
   )
}