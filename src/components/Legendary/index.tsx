
'use client';
import { VerticalContainer } from "../VerticalContainer";

export function Legendary({ data }: any) {
  return (
    <VerticalContainer
      title='Legendary'
      data={data}
      legendary={true}
    />
  );
}
