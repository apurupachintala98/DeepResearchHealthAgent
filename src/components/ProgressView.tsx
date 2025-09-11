// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"

// const steps = [
//   { title: "API Fetch", sub: "Fetching comprehensive claims data", icon: "⚡" },
//   { title: "Deidentification", sub: "Advanced PHI removal with clinical preservation", icon: "🔒" },
//   { title: "Field Extraction", sub: "Extracting medical and pharmacy fields", icon: "📄" },
//   { title: "Entity Extraction", sub: "Advanced health entity identification", icon: "🧠" },
//   { title: "Health Trajectory", sub: "Comprehensive predictive health analysis", icon: "📈" },
//   { title: "Heart Risk Prediction", sub: "ML-based cardiovascular assessment", icon: "❤️" },
//   { title: "Chatbot Initialization", sub: "AI assistant with graph generation", icon: "🤖" },
// ]

// const stepThresholds = [14, 29, 43, 57, 71, 86, 100]

// export const ProgressView: React.FC = () => {
//   const [progress, setProgress] = useState(0)
//   const [stepIndex, setStepIndex] = useState(0)

//   useEffect(() => {
//     if (stepIndex >= steps.length) {
//       setProgress(100)
//       return
//     }

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const target = stepThresholds[stepIndex]
//         const next = Math.min(prev + Math.random() * 3, target)

//         if (next >= target) {
//           setStepIndex((i) => Math.min(i + 1, steps.length))
//         }

//         return next
//       })
//     }, 500)

//     return () => clearInterval(interval)
//   }, [stepIndex])

//   return (
//     <section className="progress-page">
//       {/* <div className="progress-page__top">
//         <div className="pill pill--danger">Started Enhanced Healthcare Analysis</div>
//       </div>

//       <div className="progress-page__content">
//         <h2 className="title center">Deep Research Analysis</h2>
//         <p className="sub center">Comprehensive health analysis workflow with graph generation</p> */}

//         <div className="kpis">
//           <div className="kpi">
//             <div className="kpi__label">Total Steps</div>
//             <div className="kpi__value">{steps.length}</div>
//           </div>
//           <div className="kpi">
//             <div className="kpi__label">Completed</div>
//             <div className="kpi__value">{stepIndex}</div>
//           </div>
//           <div className="kpi">
//             <div className="kpi__label">Processing</div>
//             <div className="kpi__value">{stepIndex < steps.length ? 1 : 0}</div>
//           </div>
//           <div className="kpi">
//             <div className="kpi__label">Progress</div>
//             <div className="kpi__value">{Math.round(progress)}%</div>
//           </div>
//         </div>

//         <div className="progress-bar">
//           <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
//         </div>

//         {/* <div className="tasks">
//           {steps.map((step, index) => {
//             let status = "task--muted"
//             if (index < stepIndex) status = "task--done"
//             else if (index === stepIndex) status = "task--active"

//             return (
//               <div key={index} className={`task ${status}`}>
//                 <div className="task__icon">{step.icon}</div>
//                 <div className="task__title">{step.title}</div>
//                 <div className="task__sub">{step.sub}</div>
//               </div>
//             )
//           })}
//         </div> */}

//         {stepIndex === steps.length && (
//           <div className="rows fade-in">
//             <p className="pt-4 font-bold">All steps are completed. Displaying final data...</p>
//           </div>
//         )}
//       {/* </div> */}
//     </section>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const progressSteps = [
  { label: "API Fetch", duration: 900 },
  { label: "Deidentification", duration: 900 },
  { label: "Field Extraction", duration: 900 },
  { label: "Entity Extraction", duration: 900 },
  { label: "Health Trajectory", duration: 900 },
  { label: "Heart Risk Prediction", duration: 900 },
  { label: "Chatbot Initialization", duration: 900 },
]

export function ProgressView() {
  const [currentStep, setCurrentStep] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout
    let progressInterval: NodeJS.Timeout

    const runStep = (stepIndex: number) => {
      if (stepIndex >= progressSteps.length) {
        setIsCompleted(true)
        setOverallProgress(100)
        return
      }

      const step = progressSteps[stepIndex]
      setCurrentStep(stepIndex)

      const baseProgress = (stepIndex / progressSteps.length) * 100
      const stepProgress = (1 / progressSteps.length) * 100

      // Animate progress for current step
      let currentStepProgress = 0
      progressInterval = setInterval(() => {
        currentStepProgress += 2
        const stepCompletion = Math.min(currentStepProgress, 100)

        const totalProgress = baseProgress + (stepCompletion / 100) * stepProgress
        setOverallProgress(Math.min(totalProgress, 100))

        if (currentStepProgress >= 100) {
          clearInterval(progressInterval)
        }
      }, step.duration / 50)

      // Move to next step
      stepTimeout = setTimeout(() => {
        clearInterval(progressInterval)
        runStep(stepIndex + 1)
      }, step.duration)
    }

    runStep(0)

    return () => {
      clearTimeout(stepTimeout)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <Card className="p-6 bg-muted/30 border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {isCompleted
              ? "Analysis Complete"
              : currentStep < progressSteps.length
                ? progressSteps[currentStep].label
                : "Finalizing..."}
          </span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-primary animate-pulse"}`} />
            <span className="text-xs text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
        </div>

        <Progress value={overallProgress} className="h-2" />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Step {isCompleted ? progressSteps.length : Math.min(currentStep + 1, progressSteps.length)} of{" "}
            {progressSteps.length}
          </span>
          <span>{isCompleted ? "Ready!" : "Please wait..."}</span>
        </div>
      </div>
    </Card>
  )
}
