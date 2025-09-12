"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { PatientForm, type PatientFormValues } from "./components/PatientForm";
import { ProgressView } from "./components/ProgressView";
import { ResultsView, type AnalysisResult } from "./components/ResultsView";
import AgentService from "./api/AgentService";

type Stage = "form" | "processing" | "complete";

export const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>("form");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [patient, setPatient] = useState<PatientFormValues>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    zip: "",
    ssn: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (stage === "processing" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stage]);

  async function handleSubmit(values: PatientFormValues) {
    setPatient(values);
    setStage("processing");
    setIsProcessing(true);

    try {
      const payload: {
        first_name: string;
        last_name: string;
        ssn: string;
        date_of_birth: string;
        gender: "M" | "F";
        zip_code: string;
      } = {
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        ssn: values.ssn.trim(),
        date_of_birth: values.dob,
        gender: values.gender === "Female" ? "F" : "M",
        zip_code: values.zip.trim(),
      };


      const apiResponse = await AgentService.runAnalysisSync(payload);

      if (!apiResponse.success || !apiResponse.data?.analysis_results) {
        throw new Error("Invalid response from analysis API");
      }

      const analysis = apiResponse.data.analysis_results;

      const transformedResult: AnalysisResult = {
        claimsData: analysis.api_outputs.medical.body.MEDICAL_CLAIMS || [],
        claimsAnalysis: analysis.structured_extractions?.medical?.hlth_srvc_records || [],
        mcidClaims: [analysis.api_outputs.mcid.body || {}],
        icd10Data:
          analysis.structured_extractions?.medical?.hlth_srvc_records?.flatMap((record: any) =>
            record.diagnosis_codes?.map((code: any) => ({
              code: code.code,
              meaning:
                analysis.structured_extractions?.medical?.code_meanings?.diagnosis_code_meanings?.[code.code] || "",
              date: record.clm_rcvd_dt,
              provider: record.billg_prov_nm,
              zip: record.billg_prov_zip_cd,
              position: code.position,
              source: code.source,
              path: record.data_path,
            })) || []
          ) || [],
        serviceCodeData: [], // You can populate this later if needed
        ndcData:
          analysis.structured_extractions?.pharmacy?.ndc_records?.map((ndc: any) => ({
            code: ndc.ndc,
            meaning:
              analysis.structured_extractions?.pharmacy?.code_meanings?.ndc_code_meanings?.[ndc.ndc] || "",
            date: ndc.rx_filled_dt,
            provider: ndc.billg_prov_nm,
            zip: "",
            position: 0,
            source: "pharmacy",
            path: ndc.data_path,
          })) || [],
        medicationData:
          analysis.entity_extraction?.medications_identified?.map((med: any) => ({
            code: med.ndc,
            meaning: med.label_name,
            date: "",
            provider: med.billing_provider,
            zip: "",
            position: 0,
            source: "entity_extraction",
            path: "",
          })) || [],
        entities: [
          { type: "Diabetes Status", value: analysis.entity_extraction?.diabetics || "Unknown" },
          { type: "Age Group", value: analysis.entity_extraction?.age_group || "Unknown" },
          { type: "Smoking Status", value: analysis.entity_extraction?.smoking || "Unknown" },
          { type: "Alcohol Use", value: analysis.entity_extraction?.alcohol || "Unknown" },
          { type: "Blood Pressure", value: analysis.entity_extraction?.blood_pressure || "Unknown" },
        ],
        healthTrajectory: analysis.health_trajectory,
        heartRisk: {
          score: Math.round((analysis.heart_attack_prediction?.raw_risk_score || 0) * 100),
          level: analysis.heart_attack_prediction?.risk_category || "Unknown",
        },
      };

      setResult(transformedResult);
      setIsProcessing(false);
      setStage("complete");
    } catch (e) {
      console.error("Analysis failed:", e);
      setIsProcessing(false);
      setStage("form");
    }
  }

  function handleComplete() {
    setStage("complete");
    setShowResults(true);
  }

  function handleRunAgain() {
    setStage("form");
    setResult(null);
    setIsProcessing(false);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="w-full">
      <main
        className={`relative w-full bg-cover bg-no-repeat bg-center transition-all duration-700`}
        style={{
          backgroundImage: "url('/bg-image.png')",
          height: stage === "form" ? "100vh" : "78vh",
        }}
      >

        <h1
          className="text-4xl md:text-3xl font-bold text-slate-900 text-center pt-6"
          style={{
            color: "#6a96fe",
            fontSize: "38px",
            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3), 0 0 12px rgba(106, 150, 254, 0.4)"
          }}
        >
          Deep Research Health Agent 3.0
        </h1>


        <div className="flex justify-end items-center h-full px-10">
          <PatientForm onSubmit={handleSubmit} initialValues={patient} />
        </div>
      </main>

      <section className="px-6 py-8">
        {stage === "processing" && <ProgressView isProcessing={isProcessing} onComplete={handleComplete} />}
        {stage === "complete" && result && <ResultsView result={result} onRunAgain={handleRunAgain} />}
      </section>
    </div>
  );
};
