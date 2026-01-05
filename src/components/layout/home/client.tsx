/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
/** biome-ignore-all lint/correctness/useHookAtTopLevel: <explanation> */
/** biome-ignore-all lint/a11y/useAriaPropsForRole: <explanation> */
/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
/** biome-ignore-all lint/a11y/useFocusableInteractive: <explanation> */
'use client';
import NavUser from '@/components/layout/nav-user';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSettings } from '@/hooks/use-settings';
import { cva } from 'class-variance-authority';
import Link from 'fumadocs-core/link';
import { useIsScrollTop } from 'fumadocs-ui/utils/use-is-scroll-top';
import { ChevronDown, Cuboid, Languages } from 'lucide-react';
import { type ComponentProps, Fragment, useEffect, useMemo, useState } from 'react';
import { useScrollDirection } from '../../../hooks/use-scroll-direction';
import { cn } from '../../../lib/cn';
import { buttonVariants } from '../../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '../../ui/navigation-menu';
import {
  LanguageToggle
} from '../language-toggle';
import { LinkItem } from '../link-item';
import {
  LargeSearchToggle,
  SearchToggle,
} from '../search-toggle';
import {
  type LinkItemType,
  type NavOptions,
  renderTitleNav,
  resolveLinkItems,
} from '../shared';
import { SlidingNavProvider } from '../sliding-nav-indicator';
import type { HomeLayoutProps } from './index';

export const navItemVariants = cva('[&_svg]:size-4', {
  variants: {
    variant: {
      main: 'inline-flex items-center gap-1 text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary',
      button: buttonVariants({
        variant: 'secondary',
        className: 'gap-1.5',
      }),
      icon: buttonVariants({
        variant: 'ghost',
        size: 'icon',
      }),
    },
  },
  defaultVariants: {
    variant: 'main',
  },
});

export function Header({
  nav = {},
  i18n = false,
  links,
  githubUrl,
  themeSwitch = {},
  searchToggle = {},
}: HomeLayoutProps) {
  const { navItems, menuItems } = useMemo(() => {
    const navItems: LinkItemType[] = [];
    const menuItems: LinkItemType[] = [];

    

    for (const item of resolveLinkItems({ links, githubUrl })) {
      switch (item.on ?? 'all') {
        case 'menu':
          menuItems.push(item);
          break;
        case 'nav':
          navItems.push(item);
          break;
        default:
          navItems.push(item);
          menuItems.push(item);
      }
    }

    return { navItems, menuItems };
  }, [links, githubUrl]);

  const isMobile = useIsMobile()

  return (
    <HeaderNavigationMenu transparentMode={nav.transparentMode}>
      <div className='flex flex-col w-full'>

        {/* header top */}
        <div className='flex flex-row items-center py-3 justify-between'>
          <div className='flex flex-row gap-2 items-center justify-between'>
            <Cuboid size={30} className='p-1.5 bg-primary  text-secondary rounded-md'/>
            {renderTitleNav(nav, {
              className: 'inline-flex items-center gap-2.5 font-semibold',
            })}
            {nav.children}
          </div>

          {/* Barra de pesquisa */}
          <div className='hidden md:flex items-center justify-center flex-1'>
            {searchToggle.enabled !== false &&
          (searchToggle.components?.lg ?? (
            <LargeSearchToggle
              className="w-full h-9 rounded-md max-w-sm bg-background"
              hideIfDisabled
            />
          ))}
          </div>

            <div className='flex flex-row gap-2 items-center justify-center'>
              
              {i18n && (
                <LanguageToggle>
                  <Languages className="size-5" />
                </LanguageToggle>
              )}
              <ul className="flex flex-row gap-2 items-center empty:hidden">
                {navItems.filter(isSecondary).map((item, i) => (
                  <NavigationMenuLinkItem
                    key={i}
                    className={cn(
                      item.type === 'icon' && '-mx-1 first:ms-0 last:me-0',
                    )}
                    item={item}
                  />
                ))}
              </ul>



              <div className='flex items-center justify-between gap-2'>

                {/* mobile buttons */}
                <ul className={cn( "hidden", isMobile && "flex flex-row items-center ms-auto")}>
                  {searchToggle.enabled !== false &&
                    (searchToggle.components?.sm ?? (
                      <SearchToggle className="p-2" hideIfDisabled />
                    ))}

                  {/* nav items mobile*/}
                  <NavigationMenuItem>

                    {/* Mobile NavbarTrigger */}
                    <NavigationMenuTrigger
                      aria-label="Toggle Menu"
                      className={cn(
                        buttonVariants({
                          size: 'icon',
                          variant: 'ghost',
                          className: 'group [&_svg]:size-5.5',
                        }),
                      )}
                      onPointerMove={
                        nav.enableHoverToOpen ? undefined : (e) => e.preventDefault()
                      }
                    >
                      <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="flex flex-col p-4">
                      {menuItems
                        .filter((item) => !isSecondary(item))
                        .map((item, i) => (
                          <MobileNavigationMenuLinkItem
                            key={i}
                            item={item}
                            className={cn(!isMobile && "hidden")}
                          />
                        ))}

                      <div className="-ms-1.5 flex flex-row items-center gap-2 max-sm:mt-2">
                        {menuItems.filter(isSecondary).map((item, i) => (
                          <MobileNavigationMenuLinkItem
                            key={i}
                            item={item}
                            className={cn(item.type === 'icon' && '-mx-1 first:ms-0')}
                          />
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                
                </ul>

                <NavUser/>
                </div>
            </div>
        </div>

        {/* header bottom */}
        <div>
          
          {/* nav items */}
          <SlidingNavProvider className={cn("flex flex-row items-center pb-2 gap-4", isMobile && "hidden")}>
            {navItems
              .filter((item) => !isSecondary(item))
              .map((item, i) => (
                <NavigationMenuLinkItem key={i} item={item} className="text-sm" />
              ))}
          </SlidingNavProvider>
          
        </div>
      </div>
    </HeaderNavigationMenu>
  );
}

function isSecondary(item: LinkItemType): boolean {
  if ('secondary' in item && item.secondary != null) return item.secondary;

  return item.type === 'icon';
}

function HeaderNavigationMenu({
  transparentMode = 'none',
  ...props
}: ComponentProps<'div'> & {
  transparentMode?: NavOptions['transparentMode'];
}) {
  const [value, setValue] = useState('');
  const isMobile = useIsMobile();
  const isTop = useIsScrollTop({ enabled: transparentMode === 'top' }) ?? true;
  const { settings } = useSettings();

  // Fechar menu quando mudar para desktop
  useEffect(() => {
    if (!isMobile) {
      setValue('');
    }
  }, [isMobile]);
  const isTransparent =
    transparentMode === 'top' ? isTop : transparentMode === 'always';
  const { scrollDirection, isAtTop } = useScrollDirection({ threshold: 10 });

  // Show header when: at top, scrolling up, menu is open, or hideHeaderOnScroll is disabled
  const isVisible = !settings.hideHeaderOnScroll || isAtTop || scrollDirection === 'up' || value.length > 0;

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id="nd-nav"
        {...props}
        className={cn(
          'sticky top-0 z-40 transition-transform duration-300',
          !isVisible && '-translate-y-full',
          props.className,
        )}
      >
        <div
          className={cn(
            'backdrop-blur-lg transition-colors *:mx-auto *:max-w-(--fd-layout-width)',
            value.length > 0 && 'max-lg:shadow-lg max-lg:rounded-b-2xl',
            (!isTransparent || value.length > 0) && 'bg-background/20',
          )}
        >
          <NavigationMenuList
            className="flex w-full items-center px-4"
            asChild
          >
            <nav>{props.children}</nav>
          </NavigationMenuList>

          <NavigationMenuViewport />
        </div>
      </header>
    </NavigationMenu>
  );
}

function NavigationMenuLinkItem({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === 'custom') return <div {...props}>{item.children}</div>;

  if (item.type === 'menu') {
    const children = item.items.map((child, j) => {
      if (child.type === 'custom') {
        return <Fragment key={j}>{child.children}</Fragment>;
      }

      const {
        banner = child.icon ? (
          <div className="w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4">
            {child.icon}
          </div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <NavigationMenuLink key={`${j}-${child.url}`} asChild>
          <Link
            href={child.url}
            external={child.external}
            {...rest}
            className={cn(
              'flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground',
              rest.className,
            )}
          >
            {rest.children ?? (
              <>
                {banner}
                <p className="text-base font-medium">{child.text}</p>
                <p className="text-sm text-fd-muted-foreground empty:hidden">
                  {child.description}
                </p>
              </>
            )}
          </Link>
        </NavigationMenuLink>
      );
    });

    return (
      <NavigationMenuItem {...props}>
        <NavigationMenuTrigger className={cn(navItemVariants(), 'rounded-md')}>
          {item.url ? (
            <Link href={item.url} external={item.external}>
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem {...props}>
      <NavigationMenuLink asChild>
        <LinkItem
          item={item}
          aria-label={item.type === 'icon' ? item.label : undefined}
          className={cn(navItemVariants({ variant: item.type }))}
        >
          {item.type === 'icon' ? item.icon : item.text}
        </LinkItem>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function MobileNavigationMenuLinkItem({
  item,
  ...props
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === 'custom')
    return <div className={cn('grid', props.className)}>{item.children}</div>;

  if (item.type === 'menu') {
    const header = (
      <>
        {item.icon}
        {item.text}
      </>
    );

    return (
      <div className={cn('mb-4 flex flex-col', props.className)}>
        <p className="mb-1 text-sm text-fd-muted-foreground">
          {item.url ? (
            <NavigationMenuLink asChild>
              <Link href={item.url} external={item.external}>
                {header}
              </Link>
            </NavigationMenuLink>
          ) : (
            header
          )}
        </p>
        {item.items.map((child, i) => (
          <MobileNavigationMenuLinkItem key={i} item={child} />
        ))}
      </div>
    );
  }

  return (
    <NavigationMenuLink asChild>
      <LinkItem
        item={item}
        className={cn(
          {
            main: 'inline-flex items-center gap-2 py-1.5 transition-colors hover:text-fd-popover-foreground/50 data-[active=true]:font-medium data-[active=true]:text-fd-primary [&_svg]:size-4',
            icon: buttonVariants({
              size: 'icon',
              variant: 'ghost',
            }),
            button: buttonVariants({
              variant: 'secondary',
              className: 'gap-1.5 [&_svg]:size-4',
            }),
          }[item.type ?? 'main'],
          props.className,
        )}
        aria-label={item.type === 'icon' ? item.label : undefined}
      >
        {item.icon}
        {item.type === 'icon' ? undefined : item.text}
      </LinkItem>
    </NavigationMenuLink>
  );
}
