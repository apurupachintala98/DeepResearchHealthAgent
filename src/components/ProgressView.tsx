// // "use client"

// // import type React from "react"
// // import { useEffect, useState } from "react"

// // export const ProgressView: React.FC = () => {
// //   // Simple animated progress for demo while API runs
// //   const [progress, setProgress] = useState(0)

// //   useEffect(() => {
// //     const id = setInterval(() => {
// //       setProgress((p) => Math.min(96, p + Math.random() * 10))
// //     }, 400)
// //     return () => clearInterval(id)
// //   }, [])

// //   return (
// //     <section className="progress-page">
// //       <div className="progress-page__top">
// //         <div className="pill pill--danger">Started Enhanced Healthcare Analysis</div>
// //       </div>

// //       <div className="progress-page__content">
// //         <h2 className="title center">Deep Research Analysis</h2>
// //         <p className="sub center">Comprehensive health analysis workflow with graph generation</p>

// //         <div className="kpis">
// //           <div className="kpi">
// //             <div className="kpi__label">Okai Steps</div>
// //             <div className="kpi__value">7</div>
// //           </div>
// //           <div className="kpi">
// //             <div className="kpi__label">Completed</div>
// //             <div className="kpi__value">{Math.max(1, Math.round(progress / 25))}</div>
// //           </div>
// //           <div className="kpi">
// //             <div className="kpi__label">Processing</div>
// //             <div className="kpi__value">{progress < 95 ? 1 : 0}</div>
// //           </div>
// //           <div className="kpi">
// //             <div className="kpi__label">Progress</div>
// //             <div className="kpi__value">{Math.round(progress)}%</div>
// //           </div>
// //         </div>

// //         <div className="progress-bar">
// //           <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
// //         </div>

// //         <div className="tasks">
// //           <div className={`task task--active`}>
// //             <div className="task__icon">⚡</div>
// //             <div className="task__title">API Fetch</div>
// //             <div className="task__sub">Fetching comprehensive claims data</div>
// //           </div>

// //           <div className="task task--muted">
// //             <div className="task__icon">🔒</div>
// //             <div className="task__title">Deidentification</div>
// //             <div className="task__sub">Advanced PII removal with clinical preservation</div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

"use client"

import type React from "react"
import { useEffect, useState } from "react"

const steps = [
  { title: "API Fetch", sub: "Fetching comprehensive claims data", icon: "⚡" },
  { title: "Deidentification", sub: "Advanced PHI removal with clinical preservation", icon: "🔒" },
  { title: "Field Extraction", sub: "Extracting medical and pharmacy fields", icon: "📄" },
  { title: "Entity Extraction", sub: "Advanced health entity identification", icon: "🧠" },
  { title: "Health Trajectory", sub: "Comprehensive predictive health analysis", icon: "📈" },
  { title: "Heart Risk Prediction", sub: "ML-based cardiovascular assessment", icon: "❤️" },
  { title: "Chatbot Initialization", sub: "AI assistant with graph generation", icon: "🤖" },
]

const stepThresholds = [14, 29, 43, 57, 71, 86, 100]

export const ProgressView: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const target = stepThresholds[stepIndex]
        const next = Math.min(prev + Math.random() * 3, target)

        if (next >= target) {
          setStepIndex((i) => Math.min(i + 1, steps.length))
        }

        return next
      })
    }, 500)

    return () => clearInterval(interval)
  }, [stepIndex])

  return (
    <section className="progress-page">
      <div className="progress-page__top">
        <div className="pill pill--danger">Started Enhanced Healthcare Analysis</div>
      </div>

      <div className="progress-page__content">
        <h2 className="title center">Deep Research Analysis</h2>
        <p className="sub center">Comprehensive health analysis workflow with graph generation</p>

        <div className="kpis">
          <div className="kpi">
            <div className="kpi__label">Okai Steps</div>
            <div className="kpi__value">{steps.length}</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Completed</div>
            <div className="kpi__value">{stepIndex}</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Processing</div>
            <div className="kpi__value">{stepIndex < steps.length ? 1 : 0}</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Progress</div>
            <div className="kpi__value">{Math.round(progress)}%</div>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="tasks">
          {steps.map((step, index) => {
            let status = "task--muted"
            if (index < stepIndex) status = "task--done"
            else if (index === stepIndex) status = "task--active"

            return (
              <div key={index} className={`task ${status}`}>
                <div className="task__icon">{step.icon}</div>
                <div className="task__title">{step.title}</div>
                <div className="task__sub">{step.sub}</div>
              </div>
            )
          })}
        </div>

        {stepIndex === steps.length && (
          <div className="rows fade-in">
            <h3 className="title">📊 Analysis Results</h3>
            <p>All steps completed. Displaying final data...</p>
            {/* Replace with actual result table or component */}
          </div>
        )}
      </div>
    </section>
  )
}
