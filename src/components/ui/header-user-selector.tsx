"use client"

import * as React from "react"
import { Check, Plus, ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type Team = {
  id: string
  name: string
  logo: string
  shortcut: string
}

const teams: Team[] = [
  {
    id: "1",
    name: "Shadcn Admin",
    logo: "/avatars/shadcn.png",
    shortcut: "⌘1",
  },
  {
    id: "2",
    name: "Acme Inc",
    logo: "/avatars/acme.png",
    shortcut: "⌘2",
  },
  {
    id: "3",
    name: "Acme Corp.",
    logo: "/avatars/acme-corp.png",
    shortcut: "⌘3",
  },
]

export function HeaderTeamSelector() {
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(teams[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-between w-full px-2"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={selectedTeam.logo} alt={selectedTeam.name} />
              <AvatarFallback>{selectedTeam.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">{selectedTeam.name}</span>
              <span className="text-xs text-muted-foreground">
                NextJs + ShadcnUI
              </span>
            </div>
          </div>
          <ChevronsUpDown  className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* Teams label */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Teams
        </DropdownMenuLabel>

        {teams.map((team) => (
          <DropdownMenuItem
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className="flex items-center gap-2"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={team.logo} alt={team.name} />
              <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="flex-1">{team.name}</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {team.shortcut}
            </span>
            {selectedTeam.id === team.id && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}

        {/* Separator */}
        <DropdownMenuSeparator />

        {/* Add team button */}
        <DropdownMenuItem
          onClick={() => console.log("Add team clicked")}
          className="flex items-center gap-2 text-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Add team</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
