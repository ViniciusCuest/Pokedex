
'use client';
import { VerticalContainer } from "../VerticalContainer";

export function Legendary({ data }: any) {
  console.log(new Date().getTime(),data);
  return (
    <VerticalContainer
      title='Favorites'
      data={data}
      legendary={true}
    />
  );
}
