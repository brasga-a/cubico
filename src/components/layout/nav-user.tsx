

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  CircleUser,
  LogOut,
  Settings
} from "lucide-react"
import { useState } from "react"
import { DialogSettings } from "../settings/dialog-settings"
import { ThemeToggle } from "./theme-toggle"


export default function NavUser() {

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleSettingsOpenChange = (open: boolean) => {
    setSettingsOpen(open)
    if (open) {
      setDropdownOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src={'https://github.com/brasga-a.png'} alt={'profile'} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) !p-2 min-w-62 rounded-md bg-fd-popover/20 backdrop-blur-lg text-sm text-fd-accent-foreground dark:text-fd-popover-foreground shadow-lg"
            align="end"
            sideOffset={10}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-sm">
                  <AvatarImage src={'https://github.com/brasga-a.png'} alt={'profile'} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{'João Victor'}</span>
                  <span className="truncate text-xs text-muted-foreground">{'bradrugo2003@gmail.com'}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem className="justify-between h-10">
                Perfil
                <CircleUser />
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between h-10" onSelect={() => handleSettingsOpenChange(true)}>
                Configurações
                <Settings />
              </DropdownMenuItem>
              <div className="flex items-center justify-between px-2 py-1.5 h-10">
                    <span className="text-sm">Tema</span>
                  <ThemeToggle mode={'light-dark-system'} className="h-6"/>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="mt-2 justify-between h-10">
              Sair
              <LogOut />
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <div>
              <Button className="h-8 w-full !p-0 !px-2 mt-2 mb-1.5">Assinar Plus</Button>
            </div> */}
          </DropdownMenuContent>
      </DropdownMenu>
      <DialogSettings open={settingsOpen} onOpenChange={handleSettingsOpenChange} />
    </>
  )
}