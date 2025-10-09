"use client"

import type React from "react"
import { useState, useEffect } from "react";
import Link from "next/link"
import ClaimsTable from "./ClaimsTable"
import { HealthAnalyticsDashboard } from "../components/Health-analytics-dashboard"
import { CardiovascularRiskCard } from "../components/Cardiovascular-risk-card"
// import ReactJson from "react-json-view";
import dynamic from "next/dynamic";
import { FileText, BarChart3, Search, TrendingUp, Heart } from "lucide-react"

export type ICD10Entry = {
  code: string
  meaning: string
  date: string
  provider: string
  zip: string
}

export type ServiceCodeEntry = {
  serviceCode: string
  serviceDescription: string
  date: string
  path: string
}

export type NDCEntry = {
  code: string
  medication: string
  date: string
  description: string
  path: string
}

export type MedicationEntry = {
  ndcCode: string
  medication: string
  fillDate: string
  description: string
  billingProvider: string
  prescribingProvider: string
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

  entity_extraction?: {
    diabetics?: string
    age_group?: string
    age?: number
    smoking?: string
    alcohol?: string
    blood_pressure?: string
    medical_conditions?: string[]
  }

  extractionSummary?: {
    serviceCodeCount: number         // → "Service Codes"
    ICD10CodeCount: number           // → "ICD-10 Codes"
    medicalRecordCount: number       // → "Medical Records"
    billingProviderCount: number     // → "Billing Providers"
  }

  pharmacySummary?: {
    ndcCodeCount: number             // → "NDC Codes"
    medicationCount: number          // → "Medications"
    pharmacyRecordCount: number      // → "Pharmacy Records"
    prescribingProviderCount: number // → "Prescribing Providers"
  }
}

type Props = {
  result: AnalysisResult
  onRunAgain: () => void
}

const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});


function formatDetails(text: string) {
  const pastelColors = [
    { bg: "#fef9f1", border: "#fdebd3", text: "#7c4700" },
    { bg: "#f0f9ff", border: "#dbeafe", text: "#1e40af" },
    { bg: "#fef2f2", border: "#fde2e2", text: "#991b1b" },
    { bg: "#f0fdf4", border: "#d1fae5", text: "#065f46" },
    { bg: "#f5f3ff", border: "#e9d5ff", text: "#6b21a8" },
    { bg: "#fff7ed", border: "#ffedd5", text: "#78350f" },
    { bg: "#ecfdf5", border: "#d1fae5", text: "#047857" },
    { bg: "#fdf2f8", border: "#fbcfe8", text: "#9d174d" },
  ];

  const topHeaderColor = { bg: "#e0f7fa", border: "#b2ebf2", text: "#006064" }; 
  let sectionCount = 0;

  const formatted = text
    // Top-Level Headers (#)
    .replace(/(?:^|\n)# (.*?)(?=\n|$)/g, (_, title) => {
      return `
        </section><section style="background: ${topHeaderColor.bg}; padding: 20px 24px; border: 1px solid ${topHeaderColor.border}; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1rem; color: ${topHeaderColor.text};">
            ${title}
          </div>
      `;
    })

    // Section Headers (##)
    .replace(/(?:^|\n)## (.*?)(?=\n|$)/g, (_, title) => {
      const color = pastelColors[sectionCount % pastelColors.length];
      sectionCount++;
      return `
        </section><section style="background: ${color.bg}; padding: 20px 24px; border: 1px solid ${color.border}; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <div style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: ${color.text}; border-bottom: 1px solid ${color.border}; padding-bottom: 8px;">
            ${title}
          </div>
      `;
    })

    // Subsection Headers (###)
    .replace(/(?:^|\n)### (.*?)(?=\n|$)/g, `
      <div style="font-size: 1.1rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #374151;">
        $1
      </div>
    `)

    // Bold text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Bullet points
    .replace(/(?:^|\n)- (.*?)(?=\n|$)/g, (_, item) => `
      <ul style="padding-left: 1.5rem; margin: 0.25rem 0;">
        <li style="color: #374151; font-size: 0.95rem;">${item}</li>
      </ul>
    `)

    // Numbered points
    .replace(/(?:^|\n)\d+\. (.*?)(?=\n|$)/g, (_, item) => `
      <ol style="padding-left: 1.5rem; margin: 0.25rem 0;">
        <li style="color: #374151; font-size: 0.95rem;">${item}</li>
      </ol>
    `)

    // Paragraph spacing
    .replace(/\n\s*\n/g, "</p><p>")
    .replace(/\n/g, " ")
    .replace(/^/, "<section><p>")
    .concat("</p></section>");

  return formatted;
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

  const TABS = ["Medical Claims", "Pharmacy Claims", "MCID Claims"]
  const tabData = [result.claimsData, result.claimsAnalysis, result.mcidClaims]
  const jsonString = JSON.stringify(tabData[selectedTab], null, 2)

  const icd10Columns: Record<keyof ICD10Entry, string> = {
    code: "ICD-10 Codes",
    meaning: "Medical Meaning",
    date: "Claim Date",
    provider: "Billing Provider",
    zip: "Provider ZIP",
  };
  
  const serviceCodeColumns: Record<keyof ServiceCodeEntry, string> = {
    serviceCode: "Service Code",
    serviceDescription: "Service Description",
    date: "Service End Date",
    path: "Record Path",
  };
  
  const ndcColumns: Record<keyof NDCEntry, string> = {
    code: "NDC Code",
    medication: "Medication",
    date: "Fill Date",
    description: "NDC Description",
    path: "Record Path",
  };
  
  const medicationColumns: Record<keyof MedicationEntry, string> = {
    ndcCode: "NDC Code",
    medication: "Medication",
    fillDate: "Fill Date",
    description: "Description",
    billingProvider: "Billing Provider",
    prescribingProvider: "Prescribing Provider",
    path: "Record Path",
  };
  
  const medicalSummary = [
    {
      label: "Service Codes",
      value: result.extractionSummary?.serviceCodeCount || 0,
    },
    {
      label: "ICD-10 Codes",
      value: result.extractionSummary?.ICD10CodeCount || 0,
    },
    {
      label: "Medical Records",
      value: result.extractionSummary?.medicalRecordCount || 0,
    },
    {
      label: "Billing Providers",
      value: result.extractionSummary?.billingProviderCount || 0,
    },
  ];

  const pharmacySummary = [
    { label: "NDC Codes", value: result.pharmacySummary?.ndcCodeCount || 0 },
    { label: "Medications", value: result.pharmacySummary?.medicationCount || 0 },
    { label: "Pharmacy Records", value: result.pharmacySummary?.pharmacyRecordCount || 0 },
    { label: "Prescribing Providers", value: result.pharmacySummary?.prescribingProviderCount || 0 },
  ];

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
                border: activeTab === tab.id ? "1px solid transparent" : "1px solid #f1f5f9", // added very light border for inactive tabs
                background: activeTab === tab.id ? "#dbeafe" : "white",
                cursor: "pointer",
                fontSize: "17px",
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
                e.currentTarget.style.border = "1px solid transparent" 
                e.currentTarget.style.background =
                  "linear-gradient(white, white) padding-box, linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%) border-box"
                e.currentTarget.style.backgroundSize = "200% 200%"
                e.currentTarget.style.animation = "gradientShift 1.5s ease infinite"
                e.currentTarget.style.color = "#1e40af"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)"
                e.currentTarget.style.border = activeTab === tab.id ? "1px solid transparent" : "1px solid #f1f5f9" 
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
                      columnDefinitions={icd10Columns}
                    />
                    <div style={{ marginTop: "24px", padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
                      {/* <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
                        ICD-10 Code Frequency Analysis
                      </h3> */}
                      <div>
                       
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
                      columnDefinitions={serviceCodeColumns}
                    />
                    <div style={{ marginTop: "24px", padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
                      {/* <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
                        Service Code Frequency Analysis
                      </h3> */}
                      <div>
                       
                      </div>
                    </div>
                  </>
                )}

                {outerTab === 1 && innerTab === 0 && (
                  <ClaimsTable
                    title="NDC Codes with Fill Dates and Meanings"
                    data={result.ndcData}
                    message="NDC code data loaded successfully"
                    columnDefinitions={ndcColumns}
                  />
                )}
                {outerTab === 1 && innerTab === 1 && (
                  <ClaimsTable
                    title="Medication Names"
                    data={result.medicationData}
                    message="Medication name data loaded successfully"
                    columnDefinitions={medicationColumns}
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
            <div style={{
              marginTop: "16px",
              padding: "24px",
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#1f2937",
            }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p>${formatDetails(result.healthTrajectory)}</p>`.replace(/<p><\/p>/g, ""),
                }}
              />
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




