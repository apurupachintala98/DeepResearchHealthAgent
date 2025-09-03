"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Pill, FileText, ClipboardList, Stethoscope, BarChart3, Brain } from "lucide-react"

type Props = {
  compact?: boolean
  onSelectQuestion?: (q: string) => void
}

type Category = {
  key: string
  label: string
  icon: React.ReactNode
  questions: string[]
}

const CATEGORIES: Category[] = [
  {
    key: "records",
    label: "Medical Records",
    icon: <FileText className="h-4 w-4 text-blue-600" />,
    questions: [
      "What diagnoses were found in the medical records?",
      "What medical procedures were performed?",
      "List all ICD-10 diagnosis codes found.",
      "When did the patient start taking diabetes medication?",
      "Are there any unusual prescribing or billing patterns related to this person's records?",
    ],
  },
  {
    key: "medications",
    label: "Medications",
    icon: <Pill className="h-4 w-4 text-blue-600" />,
    questions: [
      "List current medications and dosages.",
      "Flag potential drug–drug interactions.",
      "Summarize medication adherence for the last 90 days.",
      "Show start and stop dates for each medication.",
    ],
  },
  {
    key: "risk",
    label: "Risk Assessment",
    icon: <ClipboardList className="h-4 w-4 text-blue-600" />,
    questions: [
      "Identify high‑risk conditions mentioned in the chart.",
      "Summarize readmission risk factors.",
      "Calculate 10‑year ASCVD risk if data is available.",
    ],
  },
  {
    key: "analysis",
    label: "Analysis & Graphs",
    icon: <BarChart3 className="h-4 w-4 text-blue-600" />,
    questions: [
      "Plot blood glucose trend for the last 6 months.",
      "Show vitals over time with outliers highlighted.",
      "Compare LDL values year‑over‑year.",
    ],
  },
  {
    key: "predict",
    label: "Predictive Analytics",
    icon: <Brain className="h-4 w-4 text-blue-600" />,
    questions: [
      "Predict risk of hospitalization in the next 30 days.",
      "Forecast A1C in the next 3 months based on history.",
    ],
  },
  {
    key: "care",
    label: "Care Management",
    icon: <Stethoscope className="h-4 w-4 text-blue-600" />,
    questions: [
      "Create a follow‑up checklist for diabetes management.",
      "Draft patient education for new metformin users.",
    ],
  },
]

export function QuickActions({ compact, onSelectQuestion }: Props) {
  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <Accordion type="single" collapsible className="w-full">
        {CATEGORIES.map((cat) => (
          <AccordionItem key={cat.key} value={cat.key} className="rounded-xl bg-white px-2 ring-1 ring-slate-200 mb-2">
            <AccordionTrigger className="py-2 text-left">
              <div className="flex items-center gap-2">
                {cat.icon}
                <span className="text-sm font-medium text-slate-800">{cat.label}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="mt-1 grid gap-2">
                {cat.questions.map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    className="w-full h-auto min-h-[2.5rem] whitespace-normal break-words justify-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm hover:bg-slate-50"
                    onClick={() => onSelectQuestion?.(q)}
                    aria-label={q}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
