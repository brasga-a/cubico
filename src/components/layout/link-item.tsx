'use client';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { type ComponentProps, type ReactNode, useEffect, useRef } from 'react';
import { isActive } from '../../lib/urls';
import { useSlidingNav } from './sliding-nav-indicator';

interface Filterable {
  /**
   * Restrict where the item is displayed
   *
   * @defaultValue 'all'
   */
  on?: 'menu' | 'nav' | 'all';
}

interface WithHref {
  url: string;
  /**
   * When the item is marked as active
   *
   * @defaultValue 'url'
   */
  active?: 'url' | 'nested-url' | 'none';
  external?: boolean;
}

export interface MainItemType extends WithHref, Filterable {
  type?: 'main';
  icon?: ReactNode;
  text: ReactNode;
  description?: ReactNode;
}

export interface IconItemType extends WithHref, Filterable {
  type: 'icon';
  /**
   * `aria-label` of icon button
   */
  label?: string;
  icon: ReactNode;
  text: ReactNode;
  /**
   * @defaultValue true
   */
  secondary?: boolean;
}

export interface ButtonItemType extends WithHref, Filterable {
  type: 'button';
  icon?: ReactNode;
  text: ReactNode;
  /**
   * @defaultValue false
   */
  secondary?: boolean;
}

export interface MenuItemType extends Partial<WithHref>, Filterable {
  type: 'menu';
  icon?: ReactNode;
  text: ReactNode;

  items: (
    | (MainItemType & {
        /**
         * Options when displayed on navigation menu
         */
        menu?: ComponentProps<'a'> & {
          banner?: ReactNode;
        };
      })
    | CustomItemType
  )[];

  /**
   * @defaultValue false
   */
  secondary?: boolean;
}

export interface CustomItemType extends Filterable {
  type: 'custom';
  /**
   * @defaultValue false
   */
  secondary?: boolean;
  children: ReactNode;
}

export type LinkItemType =
  | MainItemType
  | IconItemType
  | ButtonItemType
  | MenuItemType
  | CustomItemType;

export function LinkItem({
  item,
  ...props
}: Omit<ComponentProps<'a'>, 'href'> & { item: WithHref }) {
  const pathname = usePathname();
  const slidingNav = useSlidingNav();
  const itemRef = useRef<HTMLDivElement>(null);
  const itemId = item.url;

  const isMobile = useIsMobile()

  const activeType = item.active ?? 'url';
  const active =
    activeType !== 'none' &&
    isActive(item.url, pathname, activeType === 'nested-url');

  useEffect(() => {
    if (slidingNav) {
      slidingNav.registerItem(itemId, itemRef.current);
      if (active) {
        slidingNav.setActiveItem(itemId);
      }
    }
    return () => {
      if (slidingNav) {
        slidingNav.registerItem(itemId, null);
      }
    };
  }, [slidingNav, itemId, active]);

  return (
    <Link
      href={item.url}
      external={item.external}
      {...props}
      data-active={active}
    >

        <div 
          ref={itemRef} 
          className={cn(
            "relative px-2 py-1",
            isMobile && active && "bg-blue-500/20 rounded-md w-full"
          )}>
          {props.children}
        </div>
      
    </Link>
  );
}
