"use client";

import { useSyncExternalStore, useCallback } from "react";

/**
 * Custom hook for responsive breakpoint detection
 * @param query - Media query string (e.g., "(max-width: 768px)")
 * @returns boolean - true if media query matches
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      const handleChange = () => {
        callback();
      };

      // Modern browsers
      if (matchMedia.addEventListener) {
        matchMedia.addEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        matchMedia.addListener(handleChange);
      }

      return () => {
        if (matchMedia.removeEventListener) {
          matchMedia.removeEventListener("change", handleChange);
        } else {
          matchMedia.removeListener(handleChange);
        }
      };
    },
    [query]
  );

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
