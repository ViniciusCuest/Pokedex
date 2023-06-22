import { Avatar } from "../Avatars";
import { Button } from "../Button";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'
import { InputText } from "../InputText";
import { Dispatch, SetStateAction } from "react";

type Props = {
  search: Dispatch<SetStateAction<string>>
  changeScrollPosition: (next?: boolean) => void;
}

export function Pokedex({ search, changeScrollPosition }: Props) {
  return (
    <>
      <div className='absolute top-0 mt-52 mr-8 shadow-xl right-0 z-30 border-white border-[16px] rounded-xl'>
        <div className={`h-[500px] w-[390px] rounded-md p-5 shadow-xl bg-gradient-to-b from-max_red to-min_red`}>
          <Avatar
            alt="github-photo"
            src={'https://avatars.githubusercontent.com/u/61607007?v=4'}
            className='rounded-full sm:border-black_900 border-8 sm:w-44 sm:h-44'
          />
          <form
            className='mt-16 space-y-14'
            onSubmit={(e) => e.preventDefault()}
          >
            <InputText changeValue={search} />
            <div className='flex flex-row items-center justify-between px-2'>
              <Button onPress={() => changeScrollPosition()} title="Anterior" right>
                <MdOutlineNavigateBefore size={30} fill="#fff" />
              </Button>
              <Button onPress={() => changeScrollPosition(true)} title="Próximo">
                <MdOutlineNavigateNext size={30} fill="#fff" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <span className="blur-[48px] top-0 mt-52 right-0 mr-80 absolute w-60 h-[560px] z-0 bg-background" />
    </>
  );
}
