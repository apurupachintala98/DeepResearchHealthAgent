export type PatientInfo = {
  firstName: string
  lastName: string
  dob: string // yyyy-mm-dd
  gender: "Male" | "Female" | "Other"
  zip: string
  ssn: string
}

export type ProgressSnapshot = {
  totalSteps: number
  completed: number
  processing: number
  percent: number
  activeTask: string
  tasks: Array<{ name: string; status: "pending" | "processing" | "done" }>
}

export type AnalysisResult = {
  message: string
  sections: Array<{ title: string; items: string[] }>
}

/**
 * Mock analysis that streams progress updates and resolves with a result.
 * Replace delays with your real API and call `onProgress` as updates arrive.
 */
export async function analyzePatient(
  patient: PatientInfo,
  onProgress: (p: ProgressSnapshot) => void,
  signal?: AbortSignal,
): Promise<AnalysisResult> {
  const steps = [
    "API Fetch",
    "Deidentification",
    "Claims Data",
    "Claims Data Analysis",
    "Entity Extraction",
    "Heart Attack Risk Prediction",
    "Report Assembly",
  ]
  const tasks = steps.map((name) => ({ name, status: "pending" as const }))
  const total = tasks.length

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

  for (let i = 0; i < total; i++) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
    tasks.forEach((t, idx) => (t.status = idx < i ? "done" : idx === i ? "processing" : "pending"))

    // minor sub-bursts for smoother progress
    const bursts = 3
    for (let b = 0; b < bursts; b++) {
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
      const completed = i + b / bursts
      onProgress({
        totalSteps: total,
        completed: Math.floor(completed),
        processing: 1,
        percent: Math.min(99, Math.round((completed / total) * 100)),
        activeTask: tasks[i].name,
        tasks: tasks.map((t) => ({ ...t })),
      })
      await sleep(350)
    }

    tasks[i].status = "done"
    onProgress({
      totalSteps: total,
      completed: i + 1,
      processing: i + 1 < total ? 1 : 0,
      percent: Math.round(((i + 1) / total) * 100),
      activeTask: i + 1 < total ? tasks[i + 1].name : "Complete",
      tasks: tasks.map((t) => ({ ...t })),
    })
  }

  await sleep(300)

  return {
    message: `Deep Research complete for ${patient.firstName} ${patient.lastName}.`,
    sections: [
      {
        title: "Claims Data",
        items: ["12 months of claims from 2 providers", "Top categories: Primary Care, Cardiology"],
      },
      {
        title: "Claims Data Analysis",
        items: ["Elevated ER follow-up frequency", "Potential gap: medication adherence tracking"],
      },
      {
        title: "Entity Extraction",
        items: ["ICD-10: I10, E11.9", "Medications: Metformin, Lisinopril"],
      },
      {
        title: "Heart Attack Risk Prediction",
        items: ["Moderate 10-year risk estimate (~14%, not a diagnosis)", "Recommend: lipid panel + lifestyle program"],
      },
    ],
  }
}
