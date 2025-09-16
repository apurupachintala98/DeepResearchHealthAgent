"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ResizablePaneProps {
  children: [React.ReactNode, React.ReactNode]
  defaultSize?: number
  minSize?: number
  maxSize?: number
  className?: string
}

export function ResizablePane({
  children,
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  className,
}: ResizablePaneProps) {
  const [leftWidth, setLeftWidth] = useState(defaultSize)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      const clampedWidth = Math.min(Math.max(newLeftWidth, minSize), maxSize)
      setLeftWidth(clampedWidth)
    },
    [isDragging, minSize, maxSize],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div ref={containerRef} className={cn("flex h-full w-full", className)}>
      {/* Left Pane */}
      <div style={{ width: `${leftWidth}%` }} className="flex-shrink-0 overflow-hidden">
        {children[0]}
      </div>

      {/* Resizer */}
      <div
        className={cn(
          "w-1 bg-slate-200 hover:bg-slate-300 cursor-col-resize flex-shrink-0 transition-colors",
          isDragging && "bg-blue-400",
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-0.5 h-8 bg-slate-400 rounded-full" />
        </div>
      </div>

      {/* Right Pane */}
      <div style={{ width: `${100 - leftWidth}%` }} className="flex-shrink-0 overflow-hidden">
        {children[1]}
      </div>
    </div>
  )
}
