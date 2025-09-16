"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { ChartRenderer } from "../assistant/chat-renderer"
import { cn } from "@/lib/utils"

type GraphData = {
  categories?: string[]
  data?: number[]
  graph_type: string
  title: string
  [key: string]: any
}

type GraphSidePanelProps = {
  isOpen: boolean
  onClose: () => void
  graphData: GraphData | null
}

export function GraphSidePanel({ isOpen, onClose, graphData }: GraphSidePanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!isOpen || !graphData) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          isCollapsed ? "w-12" : "w-96 md:w-[480px]",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {!isCollapsed && <h2 className="text-lg font-semibold text-slate-800">Chart Visualization</h2>}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
              {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {!isCollapsed && (
          <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
            <ChartRenderer graphData={graphData} />
          </div>
        )}
      </div>
    </>
  )
}
