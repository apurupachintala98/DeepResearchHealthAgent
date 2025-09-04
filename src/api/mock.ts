// import type { PatientFormValues } from "../components/PatientForm"
// import type { AnalysisResult } from "../components/ResultsView"

// export async function analyzePatient(
//   _values: PatientFormValues,
//   _onProgress?: (progress: number) => void,
// ): Promise<AnalysisResult> {
//   // Simulate multiple steps with slight delay
//   await sleep(2400) // matches the ProgressView animation
//   // Return deterministic sample data
//   return {
//     claimsData: [
//       "Payer: ACME Health - Policy #A1B2C3",
//       "3 claims in last 12 months",
//       "Recent visit: Cardiology - 06/12/2025",
//     ],
//     claimsAnalysis: [
//       "No duplicate claims detected",
//       "Medication adherence: 86% (good)",
//       "High-value imaging utilization within guidelines",
//     ],
//     mcidClaims: [
//       "MCID Claim #1",
//       "MCID Claim #2",
//       "MCID Claim #3"
//     ],
//     icd10Data: [
//       {
//         code: 'M19.90',
//         meaning: 'Unspecified osteoarthritis...',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 0,
//         source: 'df=ic_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: 'F32.9',
//         meaning: 'Major depressive disorder...',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 2,
//         source: 'df=ic_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: 'J45.909',
//         meaning: 'Unspecified asthma...',
//         date: '2021-06-01',
//         provider: 'MAYO CLINIC',
//         zip: '55401',
//         position: 1,
//         source: 'df=ic_2_1.csv',
//         path: 'MEDICAL_CLAIMS[1]',
//       },
//       {
//         code: 'E11.9',
//         meaning: 'Type 2 diabetes mellitus without complications',
//         date: '2021-06-15',
//         provider: 'CLEVELAND CLINIC',
//         zip: '44195',
//         position: 3,
//         source: 'df=ic_3_2.csv',
//         path: 'MEDICAL_CLAIMS[2]',
//       },
//       {
//         code: 'I10',
//         meaning: 'Essential (primary) hypertension',
//         date: '2021-07-10',
//         provider: 'JOHN HOPKINS HOSPITAL',
//         zip: '21287',
//         position: 4,
//         source: 'df=ic_4_5.csv',
//         path: 'MEDICAL_CLAIMS[3]',
//       },
//       {
//         code: 'M19.90',
//         meaning: 'Unspecified osteoarthritis...',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 0,
//         source: 'df=ic_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: 'F32.9',
//         meaning: 'Major depressive disorder...',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 2,
//         source: 'df=ic_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: 'J45.909',
//         meaning: 'Unspecified asthma...',
//         date: '2021-06-01',
//         provider: 'MAYO CLINIC',
//         zip: '55401',
//         position: 1,
//         source: 'df=ic_2_1.csv',
//         path: 'MEDICAL_CLAIMS[1]',
//       },
//       {
//         code: 'E11.9',
//         meaning: 'Type 2 diabetes mellitus without complications',
//         date: '2021-06-15',
//         provider: 'CLEVELAND CLINIC',
//         zip: '44195',
//         position: 3,
//         source: 'df=ic_3_2.csv',
//         path: 'MEDICAL_CLAIMS[2]',
//       },
//       {
//         code: 'I10',
//         meaning: 'Essential (primary) hypertension',
//         date: '2021-07-10',
//         provider: 'JOHN HOPKINS HOSPITAL',
//         zip: '21287',
//         position: 4,
//         source: 'df=ic_4_5.csv',
//         path: 'MEDICAL_CLAIMS[3]',
//       },
//       {
//         code: 'M19.90',
//         meaning: 'Unspecified osteoarthritis...',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 0,
//         source: 'df=ic_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: 'F32.9',
//         meaning: 'Major depressive disorder...',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 2,
//         source: 'df=ic_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: 'J45.909',
//         meaning: 'Unspecified asthma...',
//         date: '2021-06-01',
//         provider: 'MAYO CLINIC',
//         zip: '55401',
//         position: 1,
//         source: 'df=ic_2_1.csv',
//         path: 'MEDICAL_CLAIMS[1]',
//       },
//       {
//         code: 'E11.9',
//         meaning: 'Type 2 diabetes mellitus without complications',
//         date: '2021-06-15',
//         provider: 'CLEVELAND CLINIC',
//         zip: '44195',
//         position: 3,
//         source: 'df=ic_3_2.csv',
//         path: 'MEDICAL_CLAIMS[2]',
//       },
//       {
//         code: 'I10',
//         meaning: 'Essential (primary) hypertension',
//         date: '2021-07-10',
//         provider: 'JOHN HOPKINS HOSPITAL',
//         zip: '21287',
//         position: 4,
//         source: 'df=ic_4_5.csv',
//         path: 'MEDICAL_CLAIMS[3]',
//       }
//     ],

//     serviceCodeData: [
//       {
//         code: '99213',
//         meaning: 'Office/outpatient visit, established patient',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 1,
//         source: 'svc_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: '93000',
//         meaning: 'Electrocardiogram, complete',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 3,
//         source: 'svc_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: '80053',
//         meaning: 'Comprehensive metabolic panel',
//         date: '2021-06-01',
//         provider: 'MAYO CLINIC',
//         zip: '55401',
//         position: 2,
//         source: 'svc_2_1.csv',
//         path: 'MEDICAL_CLAIMS[1]',
//       },
//       {
//         code: '36415',
//         meaning: 'Collection of venous blood by venipuncture',
//         date: '2021-06-15',
//         provider: 'CLEVELAND CLINIC',
//         zip: '44195',
//         position: 5,
//         source: 'svc_3_2.csv',
//         path: 'MEDICAL_CLAIMS[2]',
//       },
//       {
//         code: '71020',
//         meaning: 'Chest x-ray, two views',
//         date: '2021-07-10',
//         provider: 'JOHN HOPKINS HOSPITAL',
//         zip: '21287',
//         position: 6,
//         source: 'svc_4_5.csv',
//         path: 'MEDICAL_CLAIMS[3]',
//       },
//       {
//         code: '99213',
//         meaning: 'Office/outpatient visit, established patient',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 1,
//         source: 'svc_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: '93000',
//         meaning: 'Electrocardiogram, complete',
//         date: '2021-05-13',
//         provider: 'BELLIN MEMORIAL HOSPITAL',
//         zip: '54305',
//         position: 3,
//         source: 'svc_1_3.csv',
//         path: 'MEDICAL_CLAIMS[0]',
//       },
//       {
//         code: '80053',
//         meaning: 'Comprehensive metabolic panel',
//         date: '2021-06-01',
//         provider: 'MAYO CLINIC',
//         zip: '55401',
//         position: 2,
//         source: 'svc_2_1.csv',
//         path: 'MEDICAL_CLAIMS[1]',
//       },
//       {
//         code: '36415',
//         meaning: 'Collection of venous blood by venipuncture',
//         date: '2021-06-15',
//         provider: 'CLEVELAND CLINIC',
//         zip: '44195',
//         position: 5,
//         source: 'svc_3_2.csv',
//         path: 'MEDICAL_CLAIMS[2]',
//       },
//       {
//         code: '71020',
//         meaning: 'Chest x-ray, two views',
//         date: '2021-07-10',
//         provider: 'JOHN HOPKINS HOSPITAL',
//         zip: '21287',
//         position: 6,
//         source: 'svc_4_5.csv',
//         path: 'MEDICAL_CLAIMS[3]',
//       }
//     ],

//     ndcData: [
//       {
//         code: 'CLONAZEPAM 0.5 MG',
//         meaning: 'Used to treat seizure disorders and panic attacks',
//         date: '2001-05-12',
//         provider: 'CVS PHARMACY',
//         zip: '54305',
//         position: 0,
//         source: 'df=med_1_3.csv',
//         path: 'PHARMACY_CLAIMS[28]',
//       },
//       {
//         code: 'TAMOXIFEN TAB 20MG',
//         meaning: 'Used to treat breast cancer and prevent recurrence',
//         date: '2001-04-16',
//         provider: 'WALGREENS',
//         zip: '54305',
//         position: 2,
//         source: 'df=med_1_3.csv',
//         path: 'PHARMACY_CLAIMS[11]',
//       },
//       {
//         code: 'HYDROCHLOROTHIAZID TAB12.5MG',
//         meaning: 'Diuretic used to treat high blood pressure and fluid retention',
//         date: '2001-06-01',
//         provider: 'MAYO CLINIC PHARMACY',
//         zip: '55401',
//         position: 1,
//         source: 'df=med_2_1.csv',
//         path: 'PHARMACY_CLAIMS[7]',
//       },
//       {
//         code: 'LISINOPRIL 10MG',
//         meaning: 'ACE inhibitor used to treat hypertension and heart failure',
//         date: '2001-06-15',
//         provider: 'CLEVELAND CLINIC PHARMACY',
//         zip: '44195',
//         position: 3,
//         source: 'df=med_3_2.csv',
//         path: 'PHARMACY_CLAIMS[12]',
//       },
//       {
//         code: 'GABAPENTIN 300MG',
//         meaning: 'Used to treat nerve pain and seizures',
//         date: '2001-07-10',
//         provider: 'JOHN HOPKINS PHARMACY',
//         zip: '21287',
//         position: 4,
//         source: 'df=med_4_5.csv',
//         path: 'PHARMACY_CLAIMS[19]',
//       }
//     ],

//     medicationData: [
//       {
//         code: 'CLONAZEPAM 0.5 MG',
//         meaning: 'Used to treat seizure disorders and panic attacks',
//         date: '2001-05-12',
//         provider: 'CVS PHARMACY',
//         zip: '54305',
//         position: 0,
//         source: 'df=med_1_3.csv',
//         path: 'PHARMACY_CLAIMS[28]',
//       },
//       {
//         code: 'TAMOXIFEN TAB 20MG',
//         meaning: 'Used to treat breast cancer and prevent recurrence',
//         date: '2001-04-16',
//         provider: 'WALGREENS',
//         zip: '54305',
//         position: 2,
//         source: 'df=med_1_3.csv',
//         path: 'PHARMACY_CLAIMS[11]',
//       },
//       {
//         code: 'HYDROCHLOROTHIAZID TAB12.5MG',
//         meaning: 'Diuretic used to treat high blood pressure and fluid retention',
//         date: '2001-06-01',
//         provider: 'MAYO CLINIC PHARMACY',
//         zip: '55401',
//         position: 1,
//         source: 'df=med_2_1.csv',
//         path: 'PHARMACY_CLAIMS[7]',
//       },
//       {
//         code: 'LISINOPRIL 10MG',
//         meaning: 'ACE inhibitor used to treat hypertension and heart failure',
//         date: '2001-06-15',
//         provider: 'CLEVELAND CLINIC PHARMACY',
//         zip: '44195',
//         position: 3,
//         source: 'df=med_3_2.csv',
//         path: 'PHARMACY_CLAIMS[12]',
//       },
//       {
//         code: 'GABAPENTIN 300MG',
//         meaning: 'Used to treat nerve pain and seizures',
//         date: '2001-07-10',
//         provider: 'JOHN HOPKINS PHARMACY',
//         zip: '21287',
//         position: 4,
//         source: 'df=med_4_5.csv',
//         path: 'PHARMACY_CLAIMS[19]',
//       }
//     ],

//     entities: [
//       { type: "Medication", value: "Atorvastatin 20mg" },
//       { type: "Condition", value: "Hypertension" },
//       { type: "Lab", value: "LDL Cholesterol: 128 mg/dL" },
//     ],
//     heartRisk: {
//       score: 14,
//       factors: ["Age", "LDL levels", "Family history", "Blood pressure variability"],
//     },
//   }
// }

// function sleep(ms: number) {
//   return new Promise((r) => setTimeout(r, ms))
// }
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
    mcidClaims: [
      "MCID Claim #1",
      "MCID Claim #2",
      "MCID Claim #3"
    ],
    icd10Data: [
      {
        code: 'M19.90',
        meaning: 'Unspecified osteoarthritis...',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 0,
        source: 'df=ic_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: 'F32.9',
        meaning: 'Major depressive disorder...',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 2,
        source: 'df=ic_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: 'J45.909',
        meaning: 'Unspecified asthma...',
        date: '2021-06-01',
        provider: 'MAYO CLINIC',
        zip: '55401',
        position: 1,
        source: 'df=ic_2_1.csv',
        path: 'MEDICAL_CLAIMS[1]',
      },
      {
        code: 'E11.9',
        meaning: 'Type 2 diabetes mellitus without complications',
        date: '2021-06-15',
        provider: 'CLEVELAND CLINIC',
        zip: '44195',
        position: 3,
        source: 'df=ic_3_2.csv',
        path: 'MEDICAL_CLAIMS[2]',
      },
      {
        code: 'I10',
        meaning: 'Essential (primary) hypertension',
        date: '2021-07-10',
        provider: 'JOHN HOPKINS HOSPITAL',
        zip: '21287',
        position: 4,
        source: 'df=ic_4_5.csv',
        path: 'MEDICAL_CLAIMS[3]',
      },
      {
        code: 'M19.90',
        meaning: 'Unspecified osteoarthritis...',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 0,
        source: 'df=ic_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: 'F32.9',
        meaning: 'Major depressive disorder...',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 2,
        source: 'df=ic_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: 'J45.909',
        meaning: 'Unspecified asthma...',
        date: '2021-06-01',
        provider: 'MAYO CLINIC',
        zip: '55401',
        position: 1,
        source: 'df=ic_2_1.csv',
        path: 'MEDICAL_CLAIMS[1]',
      },
      {
        code: 'E11.9',
        meaning: 'Type 2 diabetes mellitus without complications',
        date: '2021-06-15',
        provider: 'CLEVELAND CLINIC',
        zip: '44195',
        position: 3,
        source: 'df=ic_3_2.csv',
        path: 'MEDICAL_CLAIMS[2]',
      },
      {
        code: 'I10',
        meaning: 'Essential (primary) hypertension',
        date: '2021-07-10',
        provider: 'JOHN HOPKINS HOSPITAL',
        zip: '21287',
        position: 4,
        source: 'df=ic_4_5.csv',
        path: 'MEDICAL_CLAIMS[3]',
      },
      {
        code: 'M19.90',
        meaning: 'Unspecified osteoarthritis...',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 0,
        source: 'df=ic_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: 'F32.9',
        meaning: 'Major depressive disorder...',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 2,
        source: 'df=ic_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: 'J45.909',
        meaning: 'Unspecified asthma...',
        date: '2021-06-01',
        provider: 'MAYO CLINIC',
        zip: '55401',
        position: 1,
        source: 'df=ic_2_1.csv',
        path: 'MEDICAL_CLAIMS[1]',
      },
      {
        code: 'E11.9',
        meaning: 'Type 2 diabetes mellitus without complications',
        date: '2021-06-15',
        provider: 'CLEVELAND CLINIC',
        zip: '44195',
        position: 3,
        source: 'df=ic_3_2.csv',
        path: 'MEDICAL_CLAIMS[2]',
      },
      {
        code: 'I10',
        meaning: 'Essential (primary) hypertension',
        date: '2021-07-10',
        provider: 'JOHN HOPKINS HOSPITAL',
        zip: '21287',
        position: 4,
        source: 'df=ic_4_5.csv',
        path: 'MEDICAL_CLAIMS[3]',
      }
    ],

    serviceCodeData: [
      {
        code: '99213',
        meaning: 'Office/outpatient visit, established patient',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 1,
        source: 'svc_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: '93000',
        meaning: 'Electrocardiogram, complete',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 3,
        source: 'svc_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: '80053',
        meaning: 'Comprehensive metabolic panel',
        date: '2021-06-01',
        provider: 'MAYO CLINIC',
        zip: '55401',
        position: 2,
        source: 'svc_2_1.csv',
        path: 'MEDICAL_CLAIMS[1]',
      },
      {
        code: '36415',
        meaning: 'Collection of venous blood by venipuncture',
        date: '2021-06-15',
        provider: 'CLEVELAND CLINIC',
        zip: '44195',
        position: 5,
        source: 'svc_3_2.csv',
        path: 'MEDICAL_CLAIMS[2]',
      },
      {
        code: '71020',
        meaning: 'Chest x-ray, two views',
        date: '2021-07-10',
        provider: 'JOHN HOPKINS HOSPITAL',
        zip: '21287',
        position: 6,
        source: 'svc_4_5.csv',
        path: 'MEDICAL_CLAIMS[3]',
      },
      {
        code: '99213',
        meaning: 'Office/outpatient visit, established patient',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 1,
        source: 'svc_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: '93000',
        meaning: 'Electrocardiogram, complete',
        date: '2021-05-13',
        provider: 'BELLIN MEMORIAL HOSPITAL',
        zip: '54305',
        position: 3,
        source: 'svc_1_3.csv',
        path: 'MEDICAL_CLAIMS[0]',
      },
      {
        code: '80053',
        meaning: 'Comprehensive metabolic panel',
        date: '2021-06-01',
        provider: 'MAYO CLINIC',
        zip: '55401',
        position: 2,
        source: 'svc_2_1.csv',
        path: 'MEDICAL_CLAIMS[1]',
      },
      {
        code: '36415',
        meaning: 'Collection of venous blood by venipuncture',
        date: '2021-06-15',
        provider: 'CLEVELAND CLINIC',
        zip: '44195',
        position: 5,
        source: 'svc_3_2.csv',
        path: 'MEDICAL_CLAIMS[2]',
      },
      {
        code: '71020',
        meaning: 'Chest x-ray, two views',
        date: '2021-07-10',
        provider: 'JOHN HOPKINS HOSPITAL',
        zip: '21287',
        position: 6,
        source: 'svc_4_5.csv',
        path: 'MEDICAL_CLAIMS[3]',
      }
    ],

    ndcData: [
      {
        code: 'CLONAZEPAM 0.5 MG',
        meaning: 'Used to treat seizure disorders and panic attacks',
        date: '2001-05-12',
        provider: 'CVS PHARMACY',
        zip: '54305',
        position: 0,
        source: 'df=med_1_3.csv',
        path: 'PHARMACY_CLAIMS[28]',
      }
    ],

    medicationData: [
      {
        code: 'CLONAZEPAM 0.5 MG',
        meaning: 'Used to treat seizure disorders and panic attacks',
        date: '2001-05-12',
        provider: 'CVS PHARMACY',
        zip: '54305',
        position: 0,
        source: 'df=med_1_3.csv',
        path: 'PHARMACY_CLAIMS[28]',
      },
      {
        code: 'GABAPENTIN 300MG',
        meaning: 'Used to treat nerve pain and seizures',
        date: '2001-07-10',
        provider: 'JOHN HOPKINS PHARMACY',
        zip: '21287',
        position: 4,
        source: 'df=med_4_5.csv',
        path: 'PHARMACY_CLAIMS[19]',
      }
    ],

    entities: [
      { type: "Diabetes Status", value: "NO" },
      { type: "Age Group", value: "SENIOR" },
      { type: "Smoking Status", value: "NO" },
      { type: "Alcohol Use", value: "NO" },
      { type: "Blood Pressure", value: "MANAGED" },
    ],

    healthTrajectory: [
      {
        date: "2025-09-04",
        summary: "Comprehensive Health Trajectory Analysis",
        details: `
          🔮 **Risk Prediction (Clinical Outcomes)**
    
          **1. Chronic Disease Risk Assessment**  
          MODERATE TO HIGH RISK (65–75%)  
          - Hypertension: LISINOPRIL 5mg, HYDROCHLOROTHIAZIDE 25mg  
          - Asthma/COPD: ICD-10 J45.909 (2020-09-24)  
          - Chest Pain: ICD-10 R07.89 (2020-09-24)  
          - History of Breast Cancer: TAMOXIFEN 20mg  
          **Risk Factors:** Age 69, multiple providers, corticosteroid use
    
          **2. Hospitalization & Readmission Risk**  
          MODERATE RISK (45–55%)  
          - Recent respiratory diagnosis with chest pain  
          - Polypharmacy  
          - Age-related vulnerability  
          **Protective Factors:** Managed hypertension, good adherence
        `
      }
    ],
    
    // heartRisk: {
    //   score: 14,
    //   factors: ["Age", "LDL levels", "Family history", "Blood pressure variability"],
    // },
    heartRisk: {
      score: 14,       // matches "14%" in UI
      level: "Low Risk"
    },
    
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
