import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot as Robot, User } from "lucide-react"
import { cn } from "@/lib/utils"

export type Message = { id: string; role: "assistant" | "user"; text: string }

export function MessageItem({ role, text }: Message) {
  const isAssistant = role === "assistant"
  return (
    <div className={cn("flex items-center gap-3", isAssistant ? "justify-start" : "justify-end")} role="listitem">
      {isAssistant && (
        <Avatar className="h-8 w-8 bg-blue-600 text-white">
          <AvatarFallback className="bg-blue-600 text-white">
            <Robot className="h-4 w-4" aria-hidden />
          </AvatarFallback>
        </Avatar>
      )}
      {/* <Card
        className={cn(
          "max-w-[90%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
          isAssistant ? "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200" : "bg-blue-600 text-white shadow-sm",
        )}
      >
        {text}
      </Card> */}
      <Card
        className={cn(
          "max-w-[90%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
          isAssistant ? "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200" : "bg-blue-600 text-white shadow-sm"
        )}
      >
        {typeof text === "string" ? text : JSON.stringify(text, null, 2)}
      </Card>

      {!isAssistant && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-slate-200 text-slate-700">
            <User className="h-4 w-4" aria-hidden />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
