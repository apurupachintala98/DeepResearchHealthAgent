"use client"

import type React from "react"
import { useState, useRef, useEffect  } from "react"
import { PatientForm, type PatientFormValues } from "./components/PatientForm"
import { ProgressView } from "./components/ProgressView"
import { ResultsView, type AnalysisResult } from "./components/ResultsView"
import { analyzePatient } from "./api/mock"

type Stage = "form" | "processing" | "complete"

export const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>("form")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [patient, setPatient] = useState<PatientFormValues>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    zip: "",
  })

   const sectionRef = useRef<HTMLDivElement | null>(null)
   useEffect(() => {
    if (stage === "processing" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [stage])

  async function handleSubmit(values: PatientFormValues) {
    setPatient(values)
    setStage("processing")
    try {
      const res = await analyzePatient(values, () => {})
      setResult(res)
      setStage("complete")
    } catch (e) {
      console.error("[v0] Analysis failed:", e)
      setStage("form")
    }
  }

  function handleRunAgain() {
    setStage("form")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="w-full">
      {/* Background Section */}
      <main
        className={`relative w-full bg-cover bg-no-repeat bg-center transition-all duration-700`}
        style={{
          backgroundImage: "url('/bg-image.png')", 
          height: stage === "form" ? "100vh" : "78vh",
        }}
      >
         <h1 className="text-4xl md:text-3xl font-bold text-slate-900 text-center drop-shadow-md pt-6" style={{color:"#6a96fe", fontSize: "38px"}}>
            Deep Research Health Agent 3.0
          </h1>

        {/* Form aligned right */}
        <div className="flex justify-end items-center h-full px-10">
              <PatientForm onSubmit={handleSubmit} initialValues={patient} />
        </div>
      </main>

      {/* Below the background section → show results / progress */}
      <section className="px-6 py-8">
        {stage === "processing" && <ProgressView />}
        {stage === "complete" && result && (
          <ResultsView result={result} onRunAgain={handleRunAgain} />
        )}
      </section>
    </div>
  )
}


