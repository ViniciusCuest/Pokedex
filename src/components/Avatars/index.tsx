'use client';
import Image from 'next/legacy/image';
import { ClassAttributes, useEffect } from 'react';

interface Props {
  src: string;
  className?: string;
  alt?: string
  type?: 'default' | 'small';
}

export function Avatar({ src, type = 'default', alt, className }: Props) {

  return type === 'default' ?
    (<div
      className={`relative flex items-center justify-center w-20 h-20 bg-gray_500 rounded-2xl border-4 border-white sm:w-32 sm:h-32 ${className}`}
    >
      < Image
        alt={alt}
        src={src}
        className={className}
        layout='fill'
      />
    </div >)
    : type === 'small' ?
      (<div
        className={`relative sm:flex items-center justify-center bg-gray_500 rounded-2xl border-4 border-white sm:h-20 sm:w-20 ${className}`}
      >
        < Image
          alt='pokemon-image'
          src={src}
          layout='fill'
        />
      </div >)
      : null
}
