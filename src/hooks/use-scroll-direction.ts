'use client';

import { useEffect, useState } from 'react';

export type ScrollDirection = 'up' | 'down' | null;

interface UseScrollDirectionOptions {
  /** Minimum scroll threshold before direction change is registered (default: 10) */
  threshold?: number;
  /** Whether the hook is enabled (default: true) */
  enabled?: boolean;
}

export function useScrollDirection({
  threshold = 10,
  enabled = true,
}: UseScrollDirectionOptions = {}) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      // Only update if we've scrolled past the threshold
      if (Math.abs(scrollY - lastScrollY) >= threshold) {
        setScrollDirection(direction);
        lastScrollY = scrollY > 0 ? scrollY : 0;
      }

      setIsAtTop(scrollY < threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold, enabled]);

  return { scrollDirection, isAtTop };
}
