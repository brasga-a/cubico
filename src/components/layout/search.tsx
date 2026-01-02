'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps
} from 'fumadocs-ui/components/dialog/search';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const tagLabels: Record<string, string> = {
  undefined: 'Todos',
  portugues: 'Português',
  matematica: 'Matemática',
  fisica: 'Física',
  quimica: 'Química',
  biologia: 'Biologia',
  historia: 'História',
  geografia: 'Geografia',
  filosofia: 'Filosofia',
  sociologia: 'Sociologia',
  ingles: 'Inglês',
  espanhol: 'Espanhol',
  artes: 'Artes',
  educacao_fisica: 'Educação Física',
};

export default function CustomSearchDialog(props: SharedProps) {
  const [tag, setTag] = useState<string | undefined>();
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    locale: 'portuguese',
    tag,
  });

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent className='bg-fd-popover/20 backdrop-blur-xl shadow-lg'>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput placeholder='Pesquisar'/>
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        <SearchDialogFooter className="flex flex-row bg-fd-popover/20 backdrop-blur-xl">
          <DropdownMenu>
            <DropdownMenuTrigger className='inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring hover:bg-fd-accent hover:text-fd-accent-foreground gap-1 px-2 py-1.5 text-xs -m-1.5 me-auto'>
                <span className='text-fd-muted-foreground me-1'>Filtro</span>
                <span className=''>{tag ? tagLabels[tag] ?? tag : 'Todos'}</span>
                <ChevronDown className='size-3.5 text-fd-muted-foreground'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              sideOffset={10} 
              align='start'
              className="w-(--radix-dropdown-menu-trigger-width) bg-fd-popover/20 backdrop-blur-lg text-sm text-fd-accent-foreground dark:text-fd-popover-foreground shadow-lg min-w-38"
            >
                <DropdownMenuItem onClick={() => setTag(undefined)} className={cn(
                  !tag && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90'
                )}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('matematica')} className={cn(
                  tag === 'matematica' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Matemática
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('portugues')} className={cn(
                  tag === 'portugues' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Português
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('fisica')} className={cn(
                  tag === 'fisica' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Física
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('quimica')} className={cn(
                  tag === 'quimica' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Química
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('biologia')} className={cn(
                  tag === 'biologia' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Biologia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('historia')} className={cn(
                  tag === 'historia' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  História
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('geografia')} className={cn(
                  tag === 'geografia' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Geografia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('filosofia')} className={cn(
                  tag === 'filosofia' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Filosofia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('sociologia')} className={cn(
                  tag === 'sociologia' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Sociologia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('ingles')} className={cn(
                  tag === 'ingles' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Inglês
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('espanhol')} className={cn(
                  tag === 'espanhol' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Espanhol
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('artes')} className={cn(
                  tag === 'artes' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Artes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTag('educacao_fisica')} className={cn(
                  tag === 'educacao_fisica' && 'bg-blue-500/30 text-blue-600 dark:text-blue-300/90 text-sm'
                )}>
                  Educação Física
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}