'use client';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface SlidingNavContextType {
  registerItem: (id: string, element: HTMLElement | null) => void;
  setActiveItem: (id: string) => void;
}

const SlidingNavContext = createContext<SlidingNavContextType | null>(null);

export function useSlidingNav() {
  return useContext(SlidingNavContext);
}

interface SlidingNavProviderProps {
  children: ReactNode;
  className?: string;
}

export function SlidingNavProvider({ children, className }: SlidingNavProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<string, HTMLElement>>(new Map());
  const activeIdRef = useRef<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    x: number;
    width: number;
    opacity: number;
  }>({ x: 0, width: 0, opacity: 0 });

  const updateIndicatorPosition = useCallback(() => {
    const id = activeIdRef.current;
    if (!id || !containerRef.current) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const element = itemsRef.current.get(id);
    if (!element) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();

    setIndicatorStyle({
      x: itemRect.left - containerRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  }, []);

  const registerItem = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      itemsRef.current.set(id, element);
    } else {
      itemsRef.current.delete(id);
    }
  }, []);

  const setActiveItem = useCallback((id: string) => {
    if (activeIdRef.current === id) return;
    activeIdRef.current = id;
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  const contextValue = useMemo(() => ({
    registerItem,
    setActiveItem,
  }), [registerItem, setActiveItem]);

  useEffect(() => {
    updateIndicatorPosition();

    const observer = new ResizeObserver(() => {
      updateIndicatorPosition();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [updateIndicatorPosition]);

  return (
    <SlidingNavContext.Provider value={contextValue}>
      <div ref={containerRef} className={`relative ${className ?? ''}`}>
        {children}
        <div
          className="absolute bottom-1 left-0 h-0.5 rounded-full bg-blue-500 transition-[transform,width,opacity] duration-300 ease-out will-change-[transform,width]"
          style={{
            width: indicatorStyle.width,
            transform: `translateX(${indicatorStyle.x}px)`,
            opacity: indicatorStyle.opacity,
          }}
        />
      </div>
    </SlidingNavContext.Provider>
  );
}
