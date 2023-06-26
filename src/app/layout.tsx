'use client'
import './globals.css'
import { Nunito } from 'next/font/google';
import { Suspense } from 'react'
import PokeLottie from '../../public/67858-pokemon.json';
import Loading from './loading';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata = {
  title: 'Pokedex',
  description: 'Conheça mais sobre o mundo Pokémon',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className='bg-background'>
        <Suspense fallback={<Loading src={PokeLottie} />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
