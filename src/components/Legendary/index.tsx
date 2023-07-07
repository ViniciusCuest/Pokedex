
'use client';
import { VerticalContainer } from "../VerticalContainer";

export function Legendary({ data }: any) {
  return (
    <VerticalContainer
      title='Favorites'
      data={data}
      legendary={true}
    />
  );
}
