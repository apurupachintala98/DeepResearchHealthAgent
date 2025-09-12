"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import ClaimsTable from "./ClaimsTable"
import DiagnosisBarChart from "./DiagnosisBarChart"
import { HealthAnalyticsDashboard } from "./health-analytics-dashboard"
import { CardiovascularRiskCard } from "./cardiovascular-risk-card"

export type ICD10Entry = {
  code: string;
  meaning: string;
  date: string;
  provider: string;
  zip: string;
  position: number;
  source: string;
  path: string;
};

export type ServiceCodeEntry = {
  code: string;
  meaning: string;
  date: string;
  provider: string;
  zip: string;
  position: number;
  source: string;
  path: string;
};

export type NDCEntry = {
  code: string;
  meaning: string;
  date: string;
  provider: string;
  zip: string;
  position: number;
  source: string;
  path: string;
};

export type MedicationEntry = {
  code: string;
  meaning: string;
  date: string;
  provider: string;
  zip: string;
  position: number;
  source: string;
  path: string;
};

export type AnalysisResult = {
  claimsData: string[]
  claimsAnalysis: string[]
  mcidClaims: string[]
  icd10Data: ICD10Entry[]
  serviceCodeData: ServiceCodeEntry[]
  ndcData: NDCEntry[]
  medicationData: MedicationEntry[]
  entities: { type: string; value: string }[]
  healthTrajectory: string
  heartRisk: { score: number; level: string }
}

type Props = {
  result: AnalysisResult
  onRunAgain: () => void
}

function formatDetails(text: string) {
  return text
    .replace(/(?:^|\n)### (.*?)(?=\n|$)/g, '<div class="heading3">$1</div>')
    .replace(/(?:^|\n)## (.*?)(?=\n|$)/g, '<div class="heading2">$1</div>')
    .replace(/(?:^|\n)# (.*?)(?=\n|$)/g, '<div class="heading1">$1</div>')
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/(?:^|\n)- (.*?)(?=\n|$)/g, "<li>$1</li>")
    .replace(/(?:^|\n)\d+\. (.*?)(?=\n|$)/g, "<li>$1</li>")
    .replace(/(?:^|\n)🔮 (.*?)(?=\n|$)/g, '<div class="heading3">🔮 $1</div>')
    .replace(/\n\s*\n/g, "</p><p>")
    .replace(/\n/g, "<br>");
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
      <div className="results__actions flex justify-between items-center">
        <div className="banner banner--success inline-flex items-center gap-2">
          <span className="banner__icon" aria-hidden>
            ✅
          </span>
          <span>Deep Research Complete!</span>
        </div>
      </div>


      <div className="result-list">
        <Row title="Claims Data">
          {(() => {
            const [selectedTab, setSelectedTab] = useState(0)
            const [isHovered, setIsHovered] = useState(false)

            // Three tabs
            const TABS = ["Claims Data", "Claims Analysis", "MCID Claims"]
            const tabData = [
              result.claimsData,
              result.claimsAnalysis,
              result.mcidClaims
            ]
            const jsonString = JSON.stringify(tabData[selectedTab], null, 2)

            return (
              <div>
                {/* Tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
                  {TABS.map((label, index) => (
                    <button
                      key={label}
                      onClick={() => setSelectedTab(index)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        fontWeight: selectedTab === index ? "bold" : "normal",
                        background: selectedTab === index ? "#f0f4ff" : "transparent", // purple background like Claims Data Analysis
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* JSON Viewer */}
                <div
                  style={{
                    background: "#fafafa",
                    padding: "8px",
                    borderRadius: "6px",
                    marginTop: "8px",
                    position: "relative"
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {isHovered && (
                    <button
                      onClick={() => navigator.clipboard.writeText(jsonString)}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "#eee",
                        border: "none",
                        padding: "4px 8px",
                        cursor: "pointer",
                        borderRadius: "4px"
                      }}
                    >
                      Copy JSON
                    </button>
                  )}
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      fontFamily: "monospace",
                      fontSize: "14px",
                      margin: 0
                    }}
                  >
                    {jsonString}
                  </pre>
                </div>
              </div>
            )
          })()}
        </Row>

        <Row title="Claims Data Analysis">
          {(() => {
            const [outerTab, setOuterTab] = useState(0);
            const [innerTab, setInnerTab] = useState(0);

            const medicalSummary = [
              { label: "Diagnosis Codes", value: result.icd10Data.length },
              { label: "Unique Service Codes", value: result.serviceCodeData.length },
              { label: "Health Service Records", value: 25 },
              { label: "Providers", value: 5 }
            ];

            const pharmacySummary = [
              { label: "NDC Codes", value: 9 },
              { label: "Medications", value: 9 },
              { label: "Pharmacy Records", value: 33 },
              { label: "Prescribing Providers", value: 5 }
            ];

            const renderSummaryCards = (summary: { label: string; value: number }[]) => {
              const bgColors = ["#e0f2fe", "#dcfce7", "#fee2e2", "#ede9fe"]; // pastel colors

              return (
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
                  {summary.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: "1 1 200px",
                        background: bgColors[idx % bgColors.length],
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        textAlign: "center",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                      }}
                    >
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e3a8a" }}>
                        {item.value}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#333" }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              );
            };

            return (
              <div>
                {/* Outer Tabs */}
                <div style={{ display: "flex", borderBottom: "2px solid #ddd" }}>
                  {["Medical Code Meanings", "Pharmacy Code Meanings"].map((label, idx) => (
                    <button
                      key={label}
                      onClick={() => { setOuterTab(idx); setInnerTab(0); }}
                      style={{
                        flex: 1,
                        padding: "10px",
                        fontWeight: outerTab === idx ? "bold" : "normal",
                        background: outerTab === idx ? "#f0f4ff" : "transparent",
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {outerTab === 0 && renderSummaryCards(medicalSummary)}
                {outerTab === 1 && renderSummaryCards(pharmacySummary)}

                {/* Inner Tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid #ddd", marginTop: "20px" }}>
                  {(outerTab === 0
                    ? ["ICD Codes", "Medical Service Codes"]
                    : ["NDC Codes", "Medication Names"]
                  ).map((label, idx) => (
                    <button
                      key={label}
                      onClick={() => setInnerTab(idx)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        fontWeight: innerTab === idx ? "bold" : "normal",
                        background: innerTab === idx ? "#f0f4ff" : "transparent", // purple background for active inner tab
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Table Display */}
                <div style={{ marginTop: "16px" }}>
                  {outerTab === 0 && innerTab === 0 && (
                    <ClaimsTable
                      title="ICD-10 Diagnosis Codes"
                      data={result.icd10Data}
                      message="ICD-10 data loaded successfully"
                    />
                  )}
                  {outerTab === 0 && innerTab === 1 && (
                    <ClaimsTable
                      title="Medical Service Codes"
                      data={result.serviceCodeData}
                      message="Service code data loaded successfully"
                    />
                  )}

                  {outerTab === 1 && innerTab === 0 && (
                    <ClaimsTable
                      title="NDC Codes with Fill Dates and Meanings"
                      data={result.ndcData}
                      message="NDC code data loaded successfully"
                    />
                  )}
                  {outerTab === 1 && innerTab === 1 && (
                    <ClaimsTable
                      title="Medication Names"
                      data={result.medicationData}
                      message="Medication name data loaded successfully"
                    />
                  )}

                  {/* New Row after table */}
                  {(outerTab === 0 && innerTab === 0) && (
                    <Row title="ICD-10 Code Frequency Analysis">
                      {(() => {
                        // Define categories and data here
                        const categories = [
                          "C92.91", "F31.70", "F32.9", "F40.1", "F41.1",
                          "F41.9", "J45.20", "J45.909", "K21.9", "K64.9",
                          "M19.90", "M25.561", "M54.4", "R07.89", "Z17.0",
                          "Z79.810", "Z90.13"
                        ];
                        const data = [1, 1, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 1, 2, 2, 2, 2];

                        return (
                          <div>
                            {/* Chart */}
                            <DiagnosisBarChart categories={categories} data={data} />

                            {/* Text Section Below Chart */}
                            <div className="mt-6">
                              <h3 className="text-lg font-semibold">Most Frequent Diagnosis Codes:</h3>
                              <ul className="list-disc list-inside space-y-1">
                                <li><strong>J45.909</strong> (4x): Unspecified asthma, uncomplicated</li>
                                <li><strong>R07.89</strong> (2x): Other chest pain</li>
                                <li><strong>Z17.0</strong> (2x): Estrogen receptor positive status</li>
                                <li><strong>Z79.810</strong> (2x): Long term (current) use of selective estrogen receptor modulators</li>
                                <li><strong>Z90.13</strong> (2x): Acquired absence of bilateral breasts and nipples</li>
                              </ul>
                            </div>
                          </div>
                        );
                      })()}
                    </Row>
                  )}
                  {(outerTab === 0 && innerTab === 1) && (
                    <Row title="Service Code Frequency Analysis">
                      {(() => {
                        // Define categories and data here
                        const categories = [
                          "C92.91", "F31.70", "F32.9", "F40.1", "F41.1",
                          "F41.9", "J45.20", "J45.909", "K21.9", "K64.9",
                          "M19.90", "M25.561", "M54.4", "R07.89", "Z17.0",
                          "Z79.810", "Z90.13"
                        ];
                        const data = [1, 1, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 1, 2, 2, 2, 2];

                        return (
                          <div>
                            {/* Chart */}
                            <DiagnosisBarChart categories={categories} data={data} />

                            {/* Text Section Below Chart */}
                            <div className="mt-6">
                              <h3 className="text-lg font-semibold">Most Frequent Diagnosis Codes:</h3>
                              <ul className="list-disc list-inside space-y-1">
                                <li><strong>J45.909</strong> (4x): Unspecified asthma, uncomplicated</li>
                                <li><strong>R07.89</strong> (2x): Other chest pain</li>
                                <li><strong>Z17.0</strong> (2x): Estrogen receptor positive status</li>
                                <li><strong>Z79.810</strong> (2x): Long term (current) use of selective estrogen receptor modulators</li>
                                <li><strong>Z90.13</strong> (2x): Acquired absence of bilateral breasts and nipples</li>
                              </ul>
                            </div>
                          </div>
                        );
                      })()}
                    </Row>
                  )}
                </div>
              </div>
            );
          })()}
        </Row>

        <Row title="Entity Extraction">
          <div style={{ marginTop: "16px" }}>
           <HealthAnalyticsDashboard result={result} />
          </div>
        </Row>

        <Row title="Health Trajectory">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
            <div
              style={{
                background: "#f9f9f9",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                whiteSpace: "pre-wrap",
                fontSize: "0.95rem",
                lineHeight: 1.5
              }}
            >
              <div dangerouslySetInnerHTML={{
                __html: `<p>${formatDetails(result.healthTrajectory)}</p>`.replace(/<p><\/p>/g, "")
              }} />

            </div>
          </div>
        </Row>


       {/* <Row title="Heart Attack Risk Prediction"> */}
          {/* <div classN ame="cardio-risk-box">
            <div className="cardio-risk-header">
              <span>Cardiovascular Risk Assessment</span>
              <span className="cardio-risk-icon">❤️</span>
            </div>

            <div className="ml-results">
              <div className="ml-label">ML Model Prediction Results</div>
              <div className="risk-score">
                Heart Disease Risk: <span className="risk-score__value">{result.heartRisk.score}%</span>
              </div>
            </div>

            <div className="risk-level">Low Risk</div>
          </div> */}
          <CardiovascularRiskCard result={result}/>
        {/* </Row> */}

      </div>

      {/* Floating Medical Assistant Button */}
      <Link
        href="/assistant"
        className="floating-assistant-btn"
        aria-label="Launch Medical Assistant"
      >
        <img src="/images/chat-logo.png" alt="Medical Assistant Logo" className="w-6 h-6" />
      </Link>
    </section>
  )
}