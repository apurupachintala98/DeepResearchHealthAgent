"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type ChatClearButtonProps = {
  onClear: () => void
}

export default function ChatClearButton({ onClear }: ChatClearButtonProps) {
  return (
    <div className="mt-3 flex justify-center">
      <Button
        onClick={onClear}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClear();
        }}
        variant="outline"
        size="sm"
        className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-100 bg-transparent hover:text-[#1447e6]"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Clear Chat
      </Button>
    </div>
  )
}
