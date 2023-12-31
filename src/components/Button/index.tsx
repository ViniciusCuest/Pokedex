import { ReactNode } from 'react';

type Props = {
  title?: string;
  children?: ReactNode;
  onPress?: () => void;
  right?: boolean
}

export function Button({ title, children, onPress, right = false }: Props) {

  const component = right ? <>{children} {title}</> : <>{title} {children}</>
  
  return (
    <button 
      onClick={onPress}
      className='flex flex-row px-3 items-center shadow-xl justify-around w-40 h-12 bg-black_900 rounded-lg text-white font-sans font-bold hover:scale-95 transition-transform ease-in'>
      {
        component
      }
    </button>
  );
}
