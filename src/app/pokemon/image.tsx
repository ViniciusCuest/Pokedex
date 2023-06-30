'use client';
import Image from 'next/legacy/image';
import { useEffect } from 'react';

export function ImageContainer({ src, name, data }: { src: string; name: string; data: any}) {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <figure className='flex items-center flex-col justify-center mt-[-18rem] sm:mt-[-8rem]'>
      <div className='relative w-[60vw] h-[60vw] sm:w-[26rem] sm:h-[26rem]'>
        <Image
          layout='fill'
          src={src}
          className='z-10'
          priority
        />
      </div>
      <span
        style={{
          backgroundColor: 'rgba(6.30, 6.02, 6.02, 0.4)',
          boxShadow: '30px 30px 30px',
        }}
        className='w-[50%] opacity-70 h-3 sm:h-5 ml-[-50px] z-0 blur-[30px] sm:blur-[50px] mt-[-2rem] sm:opacity-100 sm:mt-[-2.5rem]'
      />
      <figcaption
        className='font-sans font-bold text-white text-[2.5rem] z-10 mt-6 sm:text-[4rem] sm:leading-[4.5rem] sm:mt-20'
      >
        {
          name[0].toUpperCase() + name.substring(1)
        }
      </figcaption>
    </figure>
  );
}
