'use client';
import Image from 'next/legacy/image';

export function ImageContainer({ src, name }: { src: string; name: string }) {
  return (
    <figure className='flex items-center flex-col justify-center mt-[-15rem] sm:mt-[-8rem]'>
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
        className='w-[50%] opacity-90 h-5 sm:h-10 ml-[-50px] sm:w-[56%] z-0 blur-[30px] sm:blur-[50px] mt-[-2.7rem] sm:opacity-100 sm:mt-[-4rem]'
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
