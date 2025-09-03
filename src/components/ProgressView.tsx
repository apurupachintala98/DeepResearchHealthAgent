"use client"

import type React from "react"
import { useEffect, useState } from "react"

export const ProgressView: React.FC = () => {
  // Simple animated progress for demo while API runs
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => Math.min(96, p + Math.random() * 10))
    }, 400)
    return () => clearInterval(id)
  }, [])

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
            <div className="kpi__value">7</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Completed</div>
            <div className="kpi__value">{Math.max(1, Math.round(progress / 25))}</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Processing</div>
            <div className="kpi__value">{progress < 95 ? 1 : 0}</div>
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
          <div className={`task task--active`}>
            <div className="task__icon">⚡</div>
            <div className="task__title">API Fetch</div>
            <div className="task__sub">Fetching comprehensive claims data</div>
          </div>

          <div className="task task--muted">
            <div className="task__icon">🔒</div>
            <div className="task__title">Deidentification</div>
            <div className="task__sub">Advanced PII removal with clinical preservation</div>
          </div>
        </div>
      </div>
    </section>
  )
}
