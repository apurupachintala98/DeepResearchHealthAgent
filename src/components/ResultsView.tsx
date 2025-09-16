"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import ClaimsTable from "./ClaimsTable"
import DiagnosisBarChart from "./DiagnosisBarChart"
import { HealthAnalyticsDashboard } from "../components/Health-analytics-dashboard"
import { CardiovascularRiskCard } from "../components/Cardiovascular-risk-card"
import ReactJson from "react-json-view"
import { FileText, BarChart3, Search, TrendingUp, Heart } from "lucide-react"

export type ICD10Entry = {
  code: string
  meaning: string
  date: string
  provider: string
  zip: string
  position: number
  source: string
  path: string
}

export type ServiceCodeEntry = {
  code: string
  meaning: string
  date: string
  provider: string
  zip: string
  position: number
  source: string
  path: string
}

export type NDCEntry = {
  code: string
  meaning: string
  date: string
  provider: string
  zip: string
  position: number
  source: string
  path: string
}

export type MedicationEntry = {
  code: string
  meaning: string
  date: string
  provider: string
  zip: string
  position: number
  source: string
  path: string
}

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
    .replace(/\n/g, "<br>")
}

const TabContent: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div className="tab-content" style={{ padding: "20px 0" }}>
      {children}
    </div>
  )
}

export const ResultsView: React.FC<Props> = ({ result, onRunAgain }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedTab, setSelectedTab] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [outerTab, setOuterTab] = useState(0)
  const [innerTab, setInnerTab] = useState(0)

  const tabs = [
    { id: 0, label: "Claims Data", icon: FileText },
    { id: 1, label: "Claims Data Analysis", icon: BarChart3 },
    { id: 2, label: "Entity Extraction", icon: Search },
    { id: 3, label: "Health Trajectory", icon: TrendingUp },
    { id: 4, label: "Heart Attack Risk Prediction", icon: Heart },
  ]

  const TABS = ["Claims Data", "Claims Analysis", "MCID Claims"]
  const tabData = [result.claimsData, result.claimsAnalysis, result.mcidClaims]
  const jsonString = JSON.stringify(tabData[selectedTab], null, 2)

  const medicalSummary = [
    { label: "Diagnosis Codes", value: result.icd10Data.length },
    { label: "Unique Service Codes", value: result.serviceCodeData.length },
    { label: "Health Service Records", value: 25 },
    { label: "Providers", value: 5 },
  ]

  const pharmacySummary = [
    { label: "NDC Codes", value: 9 },
    { label: "Medications", value: 9 },
    { label: "Pharmacy Records", value: 33 },
    { label: "Prescribing Providers", value: 5 },
  ]

  const renderSummaryCards = (summary: { label: string; value: number }[]) => {
    const bgColors = ["#e0f2fe", "#dcfce7", "#fee2e2", "#ede9fe"]

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
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e3a8a" }}>{item.value}</div>
            <div style={{ fontSize: "0.9rem", color: "#333" }}>{item.label}</div>
          </div>
        ))}
      </div>
    )
  }

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

      <div
        className="tab-navigation"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "20px",
          marginTop: "20px",
          width: "100%",
        }}
      >
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 16px",
                border: "1px solid transparent",
                background: activeTab === tab.id ? "#dbeafe" : "white",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: activeTab === tab.id ? "500" : "400",
                color: activeTab === tab.id ? "#1e40af" : "#1e40af",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: activeTab === tab.id ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 4px rgba(0,0,0,0.05)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08) translateY(-2px)"
                e.currentTarget.style.border = "1px solid #3b82f6"
                e.currentTarget.style.background = "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)"
                e.currentTarget.style.backgroundSize = "200% 200%"
                e.currentTarget.style.animation = "gradientShift 1.5s ease infinite"
               e.currentTarget.style.color = "#ffffff"
              }}
              onMouseLeave={(e) => {
               e.currentTarget.style.transform = "scale(1) translateY(0)"
                e.currentTarget.style.border = "1px solid transparent"
                e.currentTarget.style.background = activeTab === tab.id ? "#dbeafe" : "white"
                e.currentTarget.style.backgroundSize = "100% 100%"
                e.currentTarget.style.animation = "none"
                e.currentTarget.style.color = "#1e40af"
              }}
               onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(1.02) translateY(0)"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1.08) translateY(-2px)"
              }}
            >
              <IconComponent size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="tab-content-area">
        {activeTab === 0 && (
          <TabContent>
            <div>
              <div style={{ display: "flex", borderBottom: "1px solid #ddd" }}>
                {TABS.map((label, index) => (
                  <button
                    key={label}
                    onClick={() => setSelectedTab(index)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      fontWeight: selectedTab === index ? "bold" : "normal",
                      background: selectedTab === index ? "#f0f4ff" : "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div
                style={{
                  background: "#fafafa",
                  padding: "8px",
                  borderRadius: "6px",
                  marginTop: "8px",
                  position: "relative",
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
                      borderRadius: "4px",
                    }}
                  >
                    Copy JSON
                  </button>
                )}
                <ReactJson
                  src={tabData[selectedTab]}
                  name={false}
                  collapsed={false}
                  enableClipboard={true}
                  displayDataTypes={false}
                  style={{ fontSize: "14px", backgroundColor: "#fafafa", padding: "8px", borderRadius: "6px" }}
                />
              </div>
            </div>
          </TabContent>
        )}

        {activeTab === 1 && (
          <TabContent>
            <div>
              <div style={{ display: "flex", borderBottom: "2px solid #ddd" }}>
                {["Medical Code Meanings", "Pharmacy Code Meanings"].map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => {
                      setOuterTab(idx)
                      setInnerTab(0)
                    }}
                    style={{
                      flex: 1,
                      padding: "10px",
                      fontWeight: outerTab === idx ? "bold" : "normal",
                      background: outerTab === idx ? "#f0f4ff" : "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {outerTab === 0 && renderSummaryCards(medicalSummary)}
              {outerTab === 1 && renderSummaryCards(pharmacySummary)}

              <div style={{ display: "flex", borderBottom: "1px solid #ddd", marginTop: "20px" }}>
                {(outerTab === 0 ? ["ICD Codes", "Medical Service Codes"] : ["NDC Codes", "Medication Names"]).map(
                  (label, idx) => (
                    <button
                      key={label}
                      onClick={() => setInnerTab(idx)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        fontWeight: innerTab === idx ? "bold" : "normal",
                        background: innerTab === idx ? "#f0f4ff" : "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>

              <div style={{ marginTop: "16px" }}>
                {outerTab === 0 && innerTab === 0 && (
                  <>
                    <ClaimsTable
                      title="ICD-10 Diagnosis Codes"
                      data={result.icd10Data}
                      message="ICD-10 data loaded successfully"
                    />
                    <div style={{ marginTop: "24px", padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
                        ICD-10 Code Frequency Analysis
                      </h3>
                      <div>
                        {/* <DiagnosisBarChart
                          categories={[
                            "C92.91",
                            "F31.70",
                            "F32.9",
                            "F40.1",
                            "F41.1",
                            "F41.9",
                            "J45.20",
                            "J45.909",
                            "K21.9",
                            "K64.9",
                            "M19.90",
                            "M25.561",
                            "M54.4",
                            "R07.89",
                            "Z17.0",
                            "Z79.810",
                            "Z90.13",
                          ]}
                          data={[1, 1, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 1, 2, 2, 2, 2]}
                        /> */}
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold">Most Frequent Diagnosis Codes:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            <li>
                              <strong>J45.909</strong> (4x): Unspecified asthma, uncomplicated
                            </li>
                            <li>
                              <strong>R07.89</strong> (2x): Other chest pain
                            </li>
                            <li>
                              <strong>Z17.0</strong> (2x): Estrogen receptor positive status
                            </li>
                            <li>
                              <strong>Z79.810</strong> (2x): Long term (current) use of selective estrogen receptor
                              modulators
                            </li>
                            <li>
                              <strong>Z90.13</strong> (2x): Acquired absence of bilateral breasts and nipples
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {outerTab === 0 && innerTab === 1 && (
                  <>
                    <ClaimsTable
                      title="Medical Service Codes"
                      data={result.serviceCodeData}
                      message="Service code data loaded successfully"
                    />
                    <div style={{ marginTop: "24px", padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
                        Service Code Frequency Analysis
                      </h3>
                      <div>
                        {/* <DiagnosisBarChart
                          categories={[
                            "C92.91",
                            "F31.70",
                            "F32.9",
                            "F40.1",
                            "F41.1",
                            "F41.9",
                            "J45.20",
                            "J45.909",
                            "K21.9",
                            "K64.9",
                            "M19.90",
                            "M25.561",
                            "M54.4",
                            "R07.89",
                            "Z17.0",
                            "Z79.810",
                            "Z90.13",
                          ]}
                          data={[1, 1, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 1, 2, 2, 2, 2]}
                        /> */}
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold">Most Frequent Service Codes:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            <li>
                              <strong>J45.909</strong> (4x): Unspecified asthma, uncomplicated
                            </li>
                            <li>
                              <strong>R07.89</strong> (2x): Other chest pain
                            </li>
                            <li>
                              <strong>Z17.0</strong> (2x): Estrogen receptor positive status
                            </li>
                            <li>
                              <strong>Z79.810</strong> (2x): Long term (current) use of selective estrogen receptor
                              modulators
                            </li>
                            <li>
                              <strong>Z90.13</strong> (2x): Acquired absence of bilateral breasts and nipples
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
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
              </div>
            </div>
          </TabContent>
        )}

        {activeTab === 2 && (
          <TabContent>
            <div style={{ marginTop: "16px" }}>
              <HealthAnalyticsDashboard result={result} />
            </div>
          </TabContent>
        )}

        {activeTab === 3 && (
          <TabContent>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
              <div
                style={{
                  background: "#f9f9f9",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  whiteSpace: "pre-wrap",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>${formatDetails(result.healthTrajectory)}</p>`.replace(/<p><\/p>/g, ""),
                  }}
                />
              </div>
            </div>
          </TabContent>
        )}

        {activeTab === 4 && (
          <TabContent>
            <CardiovascularRiskCard result={result} />
          </TabContent>
        )}
      </div>

      <Link href="/assistant" className="floating-assistant-btn" aria-label="Launch Medical Assistant">
        <img src="/images/chat-logo.png" alt="Medical Assistant Logo" className="w-6 h-6" />
      </Link>
    </section>
  )
}
