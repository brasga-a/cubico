'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Search } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { buttonVariants } from '../ui/button';

interface SearchToggleProps
  extends Omit<ComponentProps<'button'>, 'color'> {
  hideIfDisabled?: boolean;
}

export function SearchToggle({
  hideIfDisabled,
  ...props
}: SearchToggleProps) {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'icon-sm'
        }),
        props.className,
      )}
      data-search=""
      aria-label="Abrir Pesquisa"
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search />
    </button>
  );
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<'button'> & {
  hideIfDisabled?: boolean;
}) {
  const { setOpenSearch, enabled, hotKey } = useSearchContext();

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      data-search-full=""
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border bg-fd-secondary/50 p-1.5 text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground',
        props.className,
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4" />
      <span>Pesquisar</span>
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k) => (
          <kbd key={String(k.display)} className="rounded-md border bg-fd-background px-1.5">
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}
