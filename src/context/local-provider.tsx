'use client';
import { ReactElement, ReactNode, createContext, useContext, useEffect, useState } from 'react';

type ContextProps = {
  favorites: number[];
}

type Props = {
  children: ReactNode;
}

export const DataContext = createContext({} as ContextProps)

export function SavedDataProvider({ children }: Props): ReactElement {

  const [favoritesId, setFavoritesId] = useState([1]);
  useEffect(() => {
    const favoritesExist: string | null = window.localStorage.getItem('@POKEDEX:favorites');
    if (!favoritesExist)
      return;
    setFavoritesId(JSON.parse(favoritesExist));

  }, []);

  return (
    <DataContext.Provider value={{
      favorites: favoritesId
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
