'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/use-settings';
import { Settings } from 'lucide-react';

export default function ConfiguracoesPage() {
  const { settings, isLoaded, setHideHeaderOnScroll } = useSettings();

  return (
    <main className="container py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="size-8" />
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            Personalize como o site se comporta e aparece para você.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="hide-header" className="text-sm font-medium">
                Esconder header ao rolar
              </label>
              <p className="text-sm text-muted-foreground">
                O header será escondido quando você rolar para baixo e aparecerá ao rolar para cima.
              </p>
            </div>
            <Switch
              id="hide-header"
              checked={isLoaded ? settings.hideHeaderOnScroll : true}
              onCheckedChange={setHideHeaderOnScroll}
              disabled={!isLoaded}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
