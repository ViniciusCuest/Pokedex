import { Dispatch, SetStateAction } from 'react'

type Props = {
  changeValue: Dispatch<SetStateAction<string>>;
  id: string;
}
export function InputText({ changeValue, id } : Props) {
  return (
    <div>
      <label 
        className='font-sans font-bold text-xl text-white mb-1'
        htmlFor={id}
      >
        Nome ou Número
      </label>
      <input
        type='text'
        onChange={(e) => { changeValue(e.target.value) }}
        id={id}
        placeholder='#'
        className='bg-background outline-none w-full h-12 font-sans font-medium text-lg rounded-lg shadow-lg px-2'
      />
    </div>

  )
}
