'use client';
import { useCallback } from "react";

export const useScrollLock = () => {
  const blockScroll = useCallback(() => {
    window.document.body.style.overflow = 'hidden';
  }, [])

  const activateScroll = useCallback(() => {
    window.document.body.style.overflow = '';
  }, []);
  return {
    blockScroll,
    activateScroll
  };
}
