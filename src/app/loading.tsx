import Image from 'next/image';
import Gif from '../../public/67858.gif';
export default function Loading() {
  return (
    <div className='flex items-center justify-center bg-background w-full h-[100vh]'>
      <Image alt='gif' width={500} src={Gif}/>
    </div>
  )
}
