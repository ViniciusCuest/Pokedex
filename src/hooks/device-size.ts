'use client';
import { useSyncExternalStore } from "react";

export function useDeviceDimensions() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(callback: any) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return {
    width: window.screen.width,
    height: window.screen.height
  }
}

function getServerSnapshot() {
  return {
    width: 0,
    height: 0,
  };
}
