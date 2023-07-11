'use client';
import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

type ContextProps = {
  favorites: number[];
  generationId: number;
  handleFavoriteCard: (id: number) => void;
  handleUnfavouriteCard: (id: number) => void;
  handleChangeGenerationId: (id: number) => void;
}

type Props = {
  children: ReactNode;
}

export const DataContext = createContext({} as ContextProps)

export function SavedDataProvider({ children }: Props): ReactElement {

  const [favoritesId, setFavoritesId] = useState<number[]>([1]);
  const [generationId, setGenerationId] = useState<number>(1);

  useEffect(() => {
    const favoritesExist: string | null = window.localStorage.getItem('@POKEDEX:favorites');
    if (!favoritesExist)
      return;
    setFavoritesId(JSON.parse(favoritesExist));
  }, []);

  const handleChangeGenerationId = (id: number) => {
    if (id === generationId)
      return;

    setGenerationId(id);
  }

  const handleUnfavouriteCard = (id: number) => {
    setFavoritesId(prev => [
      ...prev.filter((item: number) => item !== id)
    ]);
    window.localStorage.setItem('@POKEDEX:favorites', JSON.stringify(favoritesId))
  }

  const handleFavoriteCard = (id: number) => {
    if (!favoritesId.includes(id)) {
      window.localStorage.setItem('@POKEDEX:favorites',
        JSON.stringify([
          id,
          ...favoritesId
        ]));
      setFavoritesId((prev: number[]) => [id, ...prev]);
    }
  }


  return (
    <DataContext.Provider value={{
      favorites: favoritesId,
      generationId,
      handleFavoriteCard,
      handleUnfavouriteCard,
      handleChangeGenerationId
    }}>
      {
        children
      }
    </DataContext.Provider>
  )
}

export function useLocalData() {
  const context = useContext(DataContext);
  return context;
}
