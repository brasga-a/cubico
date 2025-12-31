/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <explanation> */
'use client';
import { cva } from 'class-variance-authority';
import { MoonStar, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ComponentProps, useEffect, useState } from 'react';
import { cn } from '../../lib/cn';

const itemVariants = cva(
  'size-6 rounded-full flex items-center justify-center text-fd-muted-foreground',
  {
    variants: {
      active: {
        true: 'border border-fd-muted text-fd-accent-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);

const full = [
  // ['system', Computer] as const,
  ['light', SunDim] as const,
  ['dark', MoonStar] as const,
];

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: ComponentProps<'div'> & {
  mode?: 'light-dark' | 'light-dark-system';
}) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = cn(
    'inline-flex items-center rounded-full border-[0.5px]',
    className,
  );

  if (mode === 'light-dark') {
    const value = mounted ? resolvedTheme : null;

    return (
      <button
        className={container}
        aria-label={`Toggle Theme`}
        onClick={() => setTheme(value === 'light' ? 'dark' : 'light')}
        data-theme-toggle=""
      >
        {full.map(([key, Icon]) => {
          if (key === 'system') return;

          return (
            <Icon
              key={key}
              className={cn(itemVariants({ active: value === key }))}
            />
          );
        })}
      </button>
    );
  }

  const value = mounted ? theme : null;

  return (
    <div className={container} data-theme-toggle="" {...props}>
      {full.map(([key, Icon]) => (
        <button
          key={key}
          aria-label={key}
          className={cn(itemVariants({ active: value === key }))}
          onClick={() => setTheme(key)}
        >
          <Icon className="!size-4"  />
        </button>
      ))}
    </div>
  );
}
