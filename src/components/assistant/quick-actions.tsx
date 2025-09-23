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
      "List all ICD-10 diagnosis codes found",
      "When did patient started taking diabetes medication?",
      "Are there any unusual prescribing or billing patterns related to this person's records?"
    ],
  },
  {
    key: "medications",
    label: "Medications",
    icon: <Pill className="h-4 w-4 text-blue-600" />,
    questions: [
      "What medications is this patient taking?",
      "What NDC codes were identified?",
      "Is this person at risk of polypharmacy (taking too many medications or unsafe combinations)?",
      "How likely is this person to stop taking prescribed medications (medication adherence risk)?",
      "Is this person likely to switch to higher-cost specialty drugs or need therapy escalation soon?"
    ],
  },
  {
    key: "risk",
    label: "Risk Assessment",
    icon: <ClipboardList className="h-4 w-4 text-blue-600" />,
    questions: [
      "What is the heart attack risk and explain why?",
      "Based on this person's medical and pharmacy history, is there a risk of developing chronic diseases like diabetes, hypertension, COPD, or chronic kidney disease?",
      "What is the likelihood that this person will be hospitalized or readmitted in the next 6–12 months?",
      "Is this person at risk of using the emergency room instead of outpatient care?",
      "Does this person have a high risk of serious events like stroke, heart attack, or other complications due to comorbidities?"
    ],
  },
  {
    key: "analysis",
    label: "Analysis & Graphs",
    icon: <BarChart3 className="h-4 w-4 text-blue-600" />,
    questions: [
      "Create a medication timeline chart",
      "Generate a comprehensive risk dashboard",
      "Show me a pie chart of medications",
      "Create a health overview visualization",
      "Generate a diagnosis timeline chart",
      "Create a bar chart of medical conditions",
      "Show medication distribution graph"
    ],
  },
  {
    key: "predict",
    label: "Predictive Analytics",
    icon: <Brain className="h-4 w-4 text-blue-600" />,
    questions: [
      "Predict the patient life expectancy with two scenarios: 1) adhering to the medication 2) non-adhering to the medication",
      "Can you model how this person's disease might progress over time (for example: diabetes → complications → hospitalizations)?",
      "Is this person likely to become a high-cost claimant next year?",
      "Can you estimate this person's future healthcare costs (per month or per year)?",
      "Based on health data, how should this person be segmented — healthy, rising risk, chronic but stable, or high-cost/critical?"
    ],
  },
  {
    key: "care",
    label: "Care Management",
    icon: <Stethoscope className="h-4 w-4 text-blue-600" />,
    questions: [
      "What preventive screenings, wellness programs, or lifestyle changes should be recommended as the next best action for this person?",
      "Does this person have any care gaps, such as missed checkups, cancer screenings, or vaccinations?",
      "Does this person have any care gaps that could affect quality metrics (like HEDIS or STAR ratings)?",
      "Is this person more likely to need inpatient hospital care or outpatient care in the future?",
      "Based on available data, how might this person's long-term health contribute to population-level risk?"
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
                    className="w-full h-auto min-h-[2.5rem] whitespace-normal break-words justify-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#1447e6]"
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
