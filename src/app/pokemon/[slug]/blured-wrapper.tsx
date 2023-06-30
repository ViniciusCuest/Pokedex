import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classN?: string;
}
export function BluredWrapper({ children, classN }: Props) {
  return (
    <span className={classN} style={{
      position: 'absolute',
      background: 'rgba(255, 255, 255, 0.20)',
      boxShadow: '2px 2px 48px rgba(0, 0, 0, 0.15)',
      borderRadius: 12,
      backdropFilter: 'blur(25px)',
      zIndex: 1
    }}>
      {
        children
      }
    </span>
  );
}
