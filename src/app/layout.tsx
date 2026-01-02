import { RootProvider } from 'fumadocs-ui/provider/next';
import 'katex/dist/katex.css';
import { Inter } from 'next/font/google';
import './global.css';

import { HomeLayout } from '@/components/layout/home';
import CustomSearchDialog from '@/components/layout/search';
import { baseOptions } from '@/lib/layout.shared';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            SearchDialog: CustomSearchDialog,
          }}
        >
          <HomeLayout 
            {...baseOptions()}
            links={[
              {
                text: 'Matérias',
                url: '/materias'
              },
              {
                text: 'Questões',
                url: '/questoes'
              },
              {
                text: 'Simulados',
                url: '/simulados'
              },
              {
                text: 'Comunidade',
                url: '/comunidade'
              }
            ]}
            themeSwitch={ {
              enabled: true,
              mode: 'light-dark-system'
            }}
            
          >
            {children}
          </HomeLayout>
        </RootProvider>
      </body>
    </html>
  );
}
