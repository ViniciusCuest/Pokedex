import Image from 'next/image';
import Pokeball from '../../../public/assets/pokeball.png'
import Logo from '../../../public/assets/pokemon-logo.png'
export function Header() {
  return (
    <header className='flex justify-center flex-col items-center z-50 border-b-[8px] shadow-xl h-20 w-full border-black_900 bg-gradient-to-r from-max_red to-min_red sm:border-b-[16px] sm:h-36' >
      <Image className='absolute mt-6 w-80 z-10' alt='pokemon' src={Logo} />
      <Image className='absolute mt-[12.5rem] w-32 rotate-[30deg]' alt='logo' src={Pokeball} />
    </header>
  )
}
