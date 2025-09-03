"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

export type AnalysisResult = {
  claimsData: string[]
  claimsAnalysis: string[]
  entities: { type: string; value: string }[]
  heartRisk: { score: number; factors: string[] }
}

type Props = {
  result: AnalysisResult
  onRunAgain: () => void
}

const Row: React.FC<{
  title: string
  children: React.ReactNode
}> = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="result-row" role="region" aria-label={title}>
      <button className="result-row__hdr" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{title}</span>
        <span className="chev" aria-hidden>
          ›
        </span>
      </button>
      {open && <div className="result-row__body">{children}</div>}
    </div>
  )
}

export const ResultsView: React.FC<Props> = ({ result, onRunAgain }) => {
  return (
    <section className="results">
      <header className="results__header">
        <div className="results__icon" aria-hidden>
          🧬
        </div>
        <h2 className="title">Deep Research Health Agent</h2>
      </header>
     

      <div className="results__actions">
                <Link
          href="/assistant"
          className="btn btn--primary inline-flex items-center gap-2"
          aria-label="Launch Medical Assistant"
        >
          <span aria-hidden>👨‍⚕️</span> Launch Medical Assistant
        </Link>
        <div className="banner banner--success">
          <span className="banner__icon" aria-hidden>
            ✅
          </span>
          <span>Deep Research Complete!</span>
        </div>
      </div>

      <div className="result-list">
        <Row title="Claims Data">
          <ul className="list">
            {result.claimsData.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Row>

        <Row title="Claims Data Analysis">
          <ul className="list">
            {result.claimsAnalysis.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Row>

        <Row title="Entity Extraction">
          <ul className="list">
            {result.entities.map((e, i) => (
              <li key={i}>
                <strong>{e.type}:</strong> {e.value}
              </li>
            ))}
          </ul>
        </Row>

        <Row title="Heart Attack Risk Prediction">
          <div className="risk">
            <div className="risk__score">
              Predicted Risk Score: <strong>{result.heartRisk.score}%</strong>
            </div>
            <div className="risk__factors">
              Key Factors:
              <ul>
                {result.heartRisk.factors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </Row>
      </div>
    </section>
  )
}
