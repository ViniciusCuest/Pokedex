'use client';
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

type ContextProps = {
  favorites: number[];
  handleFavoriteCard: (id: number) => void;
  handleUnfavouriteCard: (id: number) => void;
}

type Props = {
  children: ReactNode;
}

export const DataContext = createContext({} as ContextProps)

export function SavedDataProvider({ children }: Props): ReactElement {

  const [favoritesId, setFavoritesId] = useState<number[]>([1]);
  useEffect(() => {
    const favoritesExist: string | null = window.localStorage.getItem('@POKEDEX:favorites');
    if (!favoritesExist)
      return;
    setFavoritesId(JSON.parse(favoritesExist));
  }, []);

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
      handleFavoriteCard,
      handleUnfavouriteCard
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
