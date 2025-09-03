import type { PatientFormValues } from "../components/PatientForm"
import type { AnalysisResult } from "../components/ResultsView"

export async function analyzePatient(
  _values: PatientFormValues,
  _onProgress?: (progress: number) => void,
): Promise<AnalysisResult> {
  // Simulate multiple steps with slight delay
  await sleep(2400) // matches the ProgressView animation
  // Return deterministic sample data
  return {
    claimsData: [
      "Payer: ACME Health - Policy #A1B2C3",
      "3 claims in last 12 months",
      "Recent visit: Cardiology - 06/12/2025",
    ],
    claimsAnalysis: [
      "No duplicate claims detected",
      "Medication adherence: 86% (good)",
      "High-value imaging utilization within guidelines",
    ],
    entities: [
      { type: "Medication", value: "Atorvastatin 20mg" },
      { type: "Condition", value: "Hypertension" },
      { type: "Lab", value: "LDL Cholesterol: 128 mg/dL" },
    ],
    heartRisk: {
      score: 14,
      factors: ["Age", "LDL levels", "Family history", "Blood pressure variability"],
    },
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
