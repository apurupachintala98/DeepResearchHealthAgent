"use client"

import type React from "react"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderMarkdown = (text: string) => {
    // Split by lines for processing
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    let currentList: string[] = []
    let listType: "ul" | "ol" | null = null

    const flushList = () => {
      if (currentList.length > 0 && listType) {
        const ListComponent = listType === "ul" ? "ul" : "ol"
        elements.push(
          <ListComponent
            key={elements.length}
            className={
              listType === "ul"
                ? "ml-4 mb-4 space-y-1 list-disc list-inside"
                : "ml-4 mb-4 space-y-1 list-decimal list-inside"
            }
          >
            {currentList.map((item, idx) => (
              <li key={idx} className="text-slate-700 leading-relaxed">
                {processInlineMarkdown(item)}
              </li>
            ))}
          </ListComponent>,
        )
        currentList = []
        listType = null
      }
    }

    const processInlineMarkdown = (text: string) => {
      // Process bold text
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
      // Process italic text
      text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Process inline code
      text = text.replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')

      return <span dangerouslySetInnerHTML={{ __html: text }} />
    }

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()

      // Skip empty lines
      if (trimmedLine.length === 0) {
        flushList()
        return
      }

      // Headers
      if (trimmedLine.startsWith("### ")) {
        flushList()
        const headerText = trimmedLine.replace(/^### /, "")
        elements.push(
          <h3 key={index} className="text-lg font-semibold text-slate-800 mt-6 mb-3 border-b border-slate-200 pb-1">
            {processInlineMarkdown(headerText)}
          </h3>,
        )
      } else if (trimmedLine.startsWith("## ")) {
        flushList()
        const headerText = trimmedLine.replace(/^## /, "")
        elements.push(
          <h2 key={index} className="text-xl font-bold text-slate-800 mt-6 mb-4 border-b-2 border-slate-300 pb-2">
            {processInlineMarkdown(headerText)}
          </h2>,
        )
      } else if (trimmedLine.startsWith("# ")) {
        flushList()
        const headerText = trimmedLine.replace(/^# /, "")
        elements.push(
          <h1 key={index} className="text-2xl font-bold text-slate-800 mt-6 mb-4 border-b-2 border-slate-400 pb-2">
            {processInlineMarkdown(headerText)}
          </h1>,
        )
      }
      // Unordered lists
      else if (trimmedLine.match(/^[-*+]\s/)) {
        if (listType !== "ul") {
          flushList()
          listType = "ul"
        }
        const listItem = trimmedLine.replace(/^[-*+]\s/, "")
        currentList.push(listItem)
      }
      // Ordered lists
      else if (trimmedLine.match(/^\d+\.\s/)) {
        if (listType !== "ol") {
          flushList()
          listType = "ol"
        }
        const listItem = trimmedLine.replace(/^\d+\.\s/, "")
        currentList.push(listItem)
      }
      // Regular paragraphs
      else {
        flushList()
        elements.push(
          <p key={index} className="text-slate-700 mb-3 leading-relaxed">
            {processInlineMarkdown(trimmedLine)}
          </p>,
        )
      }
    })

    // Flush any remaining list
    flushList()

    return elements
  }

  return <div className="space-y-2">{renderMarkdown(content)}</div>
}
