/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */

import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, Bookmark, ChevronLeft, ChevronRight, Globe, Heart, Lock, type LucideIcon, Mail, Palette, Puzzle, Settings, Shield, Smartphone, Star, User, Zap } from "lucide-react";
import { type ComponentType, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AppearanceSettings from "./appearence-settings";
import UserSettings from "./user-settings";


interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type NavItem = {
  title: string;
  subItems: SubItem[];
};

type SubItem = {
  name: string;
  icon: LucideIcon;
  value: string;
  Page: ComponentType
};


const sidebarNavigation: NavItem[] = [
  {
    title: 'Configurações de usuário',
    subItems: [
      { name: "Aparência", icon: Palette, value: 'appearance', Page: AppearanceSettings },
      { name: 'Dados e privacidade', icon: Lock, value: 'security', Page: UserSettings },
      { name: "Segurança", icon: Shield, value: 'shield', Page: UserSettings },
      { name: 'Dispositivos', icon: Smartphone, value: 'devices', Page: AppearanceSettings },
    ]
  },
  {
    title: 'Configurações do aplicativo',
    subItems: [
      { name: "Notificações", icon: Bell, value: 'notifications', Page: AppearanceSettings },
      { name: 'Integrações', icon: Puzzle, value: 'integrations', Page: UserSettings }
    ]
  },
  {
    title: 'Teste 1',
    subItems: [
      { name: "Perfil", icon: User, value: 'profile', Page: UserSettings },
      { name: 'Configurações gerais', icon: Settings, value: 'general', Page: AppearanceSettings }
    ]
  },
  {
    title: 'Teste 2',
    subItems: [
      { name: "Favoritos", icon: Bookmark, value: 'favorites', Page: UserSettings },
      { name: 'Curtidas', icon: Heart, value: 'likes', Page: AppearanceSettings }
    ]
  },
  {
    title: 'Teste 3',
    subItems: [
      { name: "Destaques", icon: Star, value: 'highlights', Page: UserSettings },
      { name: 'Ações rápidas', icon: Zap, value: 'quick-actions', Page: AppearanceSettings }
    ]
  },
  {
    title: 'Teste 4',
    subItems: [
      { name: "Idioma", icon: Globe, value: 'language', Page: UserSettings },
      { name: 'E-mail', icon: Mail, value: 'email', Page: AppearanceSettings }
    ]
  },
];

export function DialogSettings ({ open, onOpenChange }: DialogProps) {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState<SubItem | null>(null);

  const handleBack = () => {
    if (activePage) {
      setActivePage(null);
    } else {
      onOpenChange(false);
    }
  };

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full h-[90vh] flex flex-col gap-0 p-0 sm:max-w-full" showCloseButton={false}>
          <DialogTitle className="sr-only">
            Configurações
          </DialogTitle>

          {/* Header */}
          <div className="flex items-center justify-center min-h-14 h-14 border-b">
            <Button
              className="absolute top-2 left-2 size-10"
              variant="ghost"
              size="icon"
              onClick={handleBack}
            >
              <ChevronLeft className="size-5"/>
            </Button>
            <span className="font-medium">
              {activePage ? activePage.name : "Configurações"}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {activePage ? (
              /* Página de configuração selecionada */
              <div className="p-4">
                <activePage.Page />
              </div>
            ) : (
              /* Lista de opções */
              <div className="p-3">
                {/* User card */}
                <div className="flex border rounded-xl items-center gap-3 p-3 mb-4">
                  <Avatar className="size-14 rounded-full">
                    <AvatarImage src="https://github.com/brasga-a.png" alt="profile" />
                    <AvatarFallback className="rounded-full">JV</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="truncate font-medium">João Victor</span>
                    <span className="truncate text-sm text-muted-foreground">bradrugo2003@gmail.com</span>
                  </div>
                </div>

                {/* Settings sections */}
                {sidebarNavigation.map((section, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide px-1 mb-2">
                      {section.title}
                    </p>
                    <div className="bg-muted/30 rounded-xl overflow-hidden">
                      {section.subItems.map((item, itemIdx) => (
                        <button
                          type="button"
                          key={item.value}
                          onClick={() => setActivePage(item)}
                          className={`w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 active:bg-muted transition-colors ${
                            itemIdx !== section.subItems.length - 1 ? "border-b border-border/50" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <item.icon className="size-4 text-primary"/>
                            </div>
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground"/>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4/5 h-[80vh] flex gap-0 p-0">
        <DialogTitle className="sr-only">
          Configurações
        </DialogTitle>
        {/* Sidebar */}
        <Tabs defaultValue="appearance" className="size-full flex flex-row gap-0">
          <TabsList className="max-w-3xs flex flex-col h-full items-start justify-start w-xs bg-background border-r rounded-r-none p-4 gap-4 scroll">

            <div className="flex items-center gap-2 pl-2 py-1.5 text-left text-sm">
                <Avatar className="size-10 rounded-sm">
                  <AvatarImage src={'https://github.com/brasga-a.png'} alt={'profile'} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-medium">{'João Victor'}</span>
                  <span className="truncate text-sm text-muted-foreground">{'bradrugo2003@gmail.com'}</span>
                </div>
              </div>

            <div className="w-full overflow-auto no-scrollbar">
              {sidebarNavigation.map((section, idx) => (
                <div key={idx} className="flex flex-col items-start justify-start w-full py-2">
                  <p className="text-sm ml-2 mb-2 text-muted-foreground">{section.title}</p>
                  {section.subItems.map((item) => (
                    <TabsTrigger key={item.value} value={item.value} className="py-1 my-[2px] text-sm text-muted-foreground w-full p-2 flex flex-row items-center justify-start !shadow-none data-[state=active]:border data-[state=active]:border-border  hover:bg-accent-foreground/10 cursor-pointer">
                      <item.icon/>
                      {item.name}
                    </TabsTrigger>
                  ))}
                </div>
              ))}
            </div>
          </TabsList>
          {sidebarNavigation.map((section) =>
            section.subItems.map((item) => (
              <TabsContent className="flex-1" key={item.value} value={item.value}>
                <div className="size-full flex flex-col">
                  <span className="w-full border-b h-12 flex items-center justify-start px-5">{item.name}</span>
                  <div className="p-5 w-full">
                    <item.Page />
                  </div>
                </div>
              </TabsContent>
            ))
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )

}