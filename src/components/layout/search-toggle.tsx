'use client';

import type { SortedResult } from 'fumadocs-core/search';

import { useDocsSearch } from 'fumadocs-core/search/client';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { FileText, Hash, Loader2, Search, Text, X } from 'lucide-react';
import Link from 'next/link';
import { type ComponentProps, useEffect, useRef, useState } from 'react';

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

function getResultIcon(type: SortedResult['type']) {
  switch (type) {
    case 'page':
      return <FileText className="size-4 shrink-0" />;
    case 'heading':
      return <Hash className="size-4 shrink-0" />;
    case 'text':
      return <Text className="size-4 shrink-0" />;
    default:
      return <FileText className="size-4 shrink-0" />;
  }
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<'button'> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey } = useSearchContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    delayMs: 150,
  });

  const results = query.data === 'empty' ? [] : query.data ?? [];
  const showResults = isExpanded && search.length > 0;

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setSearch('');
      }
    };

    const handleScroll = () => {
      setIsExpanded(false);
      setSearch('');
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded, setSearch]);

  if (hideIfDisabled && !enabled) return null;

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCollapse();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        window.location.href = selected.url;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative inline-flex items-center rounded-lg border bg-fd-secondary/50 text-sm text-fd-muted-foreground transition-all duration-300 ease-out',
        isExpanded ? 'w-80' : 'w-auto',
        props.className,
      )}
    >
      {isExpanded ? (
        <>
          <div className="p-1.5 flex w-full items-center overflow-hidden">
            <Search className=" size-4 shrink-0 text-fd-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pesquisar..."
              className="flex-1 bg-transparent px-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground outline-none"
            />
            {query.isLoading && (
              <Loader2 className="mr-2 size-4 shrink-0 animate-spin text-fd-muted-foreground" />
            )}
            <button
              type="button"
              onClick={handleCollapse}
              className=" p-1 rounded  transition-colors"
              aria-label="Fechar pesquisa"
            >
              <X className="size-4" />
            </button>
          </div>

          {showResults && (
            <div
              ref={resultsRef}
              className="absolute top-full left-0 right-0 mt-1 rounded-lg border bg-fd-popover shadow-lg max-h-80 overflow-y-auto z-50"
            >
              {results.length === 0 && !query.isLoading && (
                <div className="px-3 py-6 text-center text-fd-muted-foreground">
                  Nenhum resultado encontrado
                </div>
              )}
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={handleCollapse}
                  className={cn(
                    'flex items-start gap-3 px-3 py-2 transition-colors',
                    index === selectedIndex
                      ? 'bg-fd-accent text-fd-accent-foreground'
                      : 'hover:bg-fd-accent/50'
                  )}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="mt-0.5 text-fd-muted-foreground">
                    {getResultIcon(result.type)}
                  </span>
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    {result.breadcrumbs && result.breadcrumbs.length > 0 && (
                      <span className="text-xs text-fd-muted-foreground truncate">
                        {result.breadcrumbs.join(' › ')}
                      </span>
                    )}
                    <span className="text-sm font-medium truncate">
                      {result.content}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <button
          type="button"
          data-search-full=""
          className="inline-flex w-full items-center gap-2 p-1.5 transition-colors  hover:text-fd-accent-foreground rounded-lg"
          onClick={handleExpand}
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
      )}
    </div>
  );
}
