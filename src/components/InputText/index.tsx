import { Dispatch, SetStateAction } from "react"

type Props = {
  changeValue: Dispatch<SetStateAction<string>>
}
export function InputText({ changeValue } : Props) {
  return (
    <div>
      <label 
        className='font-sans font-bold text-xl text-white mb-1'
        htmlFor=""
      >
        Nome ou Número
      </label>
      <input
        type="text"
        onChange={(e) => { changeValue(e.target.value) }}
        placeholder="#"
        className='bg-background w-full h-12 font-sans font-medium text-lg rounded-lg shadow-lg px-2'
      />
    </div>

  )
}
