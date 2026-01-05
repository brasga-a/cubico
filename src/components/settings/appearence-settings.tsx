'use client';

import { Switch } from '@/components/ui/switch';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSettings } from '@/hooks/use-settings';
import { ThemeToggle } from '../layout/theme-toggle';

export default function AppearanceSettings() {
  const { settings, isLoaded, setHideHeaderOnScroll } = useSettings();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='space-y-4'>
        {/* Tema */}
        <div className='bg-muted/30 rounded-xl overflow-hidden'>
          <div className='px-4 py-3 flex items-center justify-between'>
            <div className='flex flex-col gap-0.5 flex-1 pr-4'>
              <span className='text-sm font-medium'>Aparência</span>
              <p className='text-xs text-muted-foreground'>Tema claro, escuro ou do sistema.</p>
            </div>
            <ThemeToggle mode='light-dark-system' className='h-6'/>
          </div>
        </div>

        {/* Barra de navegação */}
        <div className='bg-muted/30 rounded-xl overflow-hidden'>
          <div className='px-4 py-3 flex items-center justify-between'>
            <div className='flex flex-col gap-0.5 flex-1 pr-4'>
              <span className='text-sm font-medium'>Esconder barra ao rolar</span>
              <p className='text-xs text-muted-foreground'>Oculta a barra de navegação ao rolar para baixo.</p>
            </div>
            <Switch
              id='hide-header'
              checked={isLoaded ? settings.hideHeaderOnScroll : true}
              onCheckedChange={setHideHeaderOnScroll}
              disabled={!isLoaded}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-5'>

      <section className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-col gap-1'>
          <span>Aparência</span>
          <p className='text-xs text-muted-foreground'>Tema claro, escuro ou do sistema.</p>
        </div>
        <ThemeToggle mode='light-dark-system' className='h-6'/>
      </section>

      <section className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-col gap-1'>
          <span>Esconder barra ao rolar</span>
          <p className='text-xs text-muted-foreground'>Oculta a barra de navegação ao rolar para baixo.</p>
        </div>
        <Switch
          id='hide-header'
          checked={isLoaded ? settings.hideHeaderOnScroll : true}
          onCheckedChange={setHideHeaderOnScroll}
          disabled={!isLoaded}
        />
      </section>
    </div>
  );
}
