"use client"

import { ArrowLeft, MoreHorizontal } from "lucide-react"

export function ProfileHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background sticky top-0 z-40">
      <button aria-label="More options" className="text-foreground">
        <MoreHorizontal className="size-6" />
      </button>
      <h1 className="text-lg font-bold text-foreground tracking-wide">
        7lw.lak
      </h1>
      <button aria-label="Go back" className="text-foreground">
        <ArrowLeft className="size-6" />
      </button>
    </header>
  )
}
