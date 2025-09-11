"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Send, Bot as Robot, Menu, ChevronLeft, Play, Pause } from "lucide-react"
import { QuickActions } from "./quick-actions"
import { MessageItem, type Message } from "./message-item"

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", role: "assistant", text: "Welcome to your Medical Assistant. How can I help today?" },
    { id: "m2", role: "user", text: "Show my latest medications." },
    { id: "m3", role: "assistant", text: "Current prescriptions: Atorvastatin 20mg, Metformin 500mg (BID)." },
  ])
  const [input, setInput] = useState("")
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const [isStreaming, setIsStreaming] = useState(false)
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const streamingMessageId = useRef<string | null>(null)
  const streamIndex = useRef(0)
  const STREAM_TEXT =
    "Here’s a quick demo. I can summarize medical records, list medications, and help with risk assessments. Use Quick Actions on the left to insert questions, or type your own."

  useEffect(() => {
    return () => {
      if (streamTimer.current) clearInterval(streamTimer.current)
    }
  }, [])

  function startStream() {
    if (isStreaming) return
    setIsStreaming(true)

    // if we don't have a message for streaming yet, create one
    if (!streamingMessageId.current) {
      const id = crypto.randomUUID()
      streamingMessageId.current = id
      streamIndex.current = 0
      setMessages((m) => [...m, { id, role: "assistant", text: "" }])
    }

    streamTimer.current = setInterval(() => {
      const next = streamIndex.current + 1
      streamIndex.current = next
      const text = STREAM_TEXT.slice(0, next)

      setMessages((m) => m.map((msg) => (msg.id === streamingMessageId.current ? { ...msg, text } : msg)))

      if (next >= STREAM_TEXT.length) {
        if (streamTimer.current) clearInterval(streamTimer.current)
        streamTimer.current = null
        setIsStreaming(false)
        streamingMessageId.current = null
        streamIndex.current = 0
      }
    }, 28)
  }

  function pauseStream() {
    if (streamTimer.current) {
      clearInterval(streamTimer.current)
      streamTimer.current = null
    }
    setIsStreaming(false)
  }

  function send() {
    pauseStream()
    const text = input.trim()
    if (!text) return
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", text },
      { id: crypto.randomUUID(), role: "assistant", text: "Thanks — I’ll fetch that information now." },
    ])
    setInput("")
  }

  function handleSelectQuestion(question: string) {
    pauseStream()
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", text: question },
      { id: crypto.randomUUID(), role: "assistant", text: "Understood. Let me analyze the records for that." },
    ])
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 p-4 md:grid-cols-[320px_1fr] md:p-6" style={{ gridTemplateColumns: "0fr 1fr" }}>
      {/* Sidebar */}
      <aside className="sticky top-4 hidden w-80 min-w-80 max-w-80 shrink-0 overflow-x-hidden self-start md:block">
        <Card className="rounded-3xl bg-white p-4 shadow-md ring-1 ring-slate-100">
          <h3 className="mb-3 text-base font-semibold text-slate-800">Quick Questions</h3>
          <QuickActions onSelectQuestion={handleSelectQuestion} />
          <div className="mt-4">
            <Link href="/" className="block">
              <Button className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-700">
                Back to Main Page
              </Button>
            </Link>
          </div>
        </Card>
      </aside>

      {/* Chat Panel */}
      <section className="rounded-3xl bg-white p-3 shadow-md ring-1 ring-slate-100 md:p-4">
        {/* Header */}
        <header className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
              <Robot className="h-5 w-5" aria-hidden />
            </div>
            <h1 className="text-pretty text-lg font-semibold text-slate-900 md:text-xl">Medical Assistant</h1>
          </div>
          <button aria-label="Menu" className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* Welcome strip */}
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2 ring-1 ring-slate-100">
          <p className="text-sm text-slate-700">
            Welcome to your Assistant
            <span className="ml-2 text-xs text-slate-500">{isStreaming ? "(demo playing)" : "(demo paused)"}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full text-slate-600 hover:bg-slate-100"
              aria-label="Back"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={startStream}
              disabled={isStreaming}
              size="icon"
              className="h-8 w-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              aria-label="Play demo"
              aria-pressed={!isStreaming}
            >
              <Play className="h-4 w-4" />
            </Button>
            <Button
              onClick={pauseStream}
              disabled={!isStreaming}
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full border-slate-200 bg-transparent text-slate-700 disabled:opacity-50"
              aria-label="Pause demo"
              aria-pressed={isStreaming}
            >
              <Pause className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <Card className="mt-3 rounded-2xl border-none p-2 shadow-none">
          <ScrollArea className="h-[48vh] md:h-[56vh]" viewportRef={viewportRef}>
            <div className="space-y-2 p-1" role="list" aria-label="Conversation">
              {messages.map((m) => (
                <MessageItem key={m.id} role={m.role} text={m.text} id={""} />
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Composer */}
        <div className="mt-3 flex items-center gap-2 rounded-full bg-white p-1 pl-3 ring-1 ring-slate-200">
          <button aria-label="Voice input" className="rounded-full p-2 text-slate-600 hover:bg-slate-100">
            <Mic className="h-5 w-5" />
          </button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="border-0 focus-visible:ring-0"
            aria-label="Message input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
          />
          <Button
            onClick={send}
            className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700"
            aria-label="Send message"
          >
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>

        {/* Mobile quick actions */}
        <div className="mt-4 block md:hidden">
          <Card className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
            <h3 className="mb-2 text-sm font-semibold text-slate-800">Quick Actions</h3>
            <QuickActions compact onSelectQuestion={handleSelectQuestion} />
          </Card>
        </div>
      </section>
    </div>
  )
}




