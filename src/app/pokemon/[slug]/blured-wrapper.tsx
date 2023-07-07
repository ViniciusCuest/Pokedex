'use client';
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  styles?: string;
}

export function BluredWrapper({ children, styles }: Props) {
  return (
    <motion.span
    whileHover={{ scale: 1.05 }}
      className={styles}
      style={{
        background: 'rgba(255, 255, 255, 0.20)',
        boxShadow: '2px 2px 48px rgba(0, 0, 0, 0.15)',
        borderRadius: 12,
        backdropFilter: 'blur(25px)',
        zIndex: 1
      }}>
      {
        children
      }
    </motion.span>
  );
}
