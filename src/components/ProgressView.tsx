"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const progressSteps = [
  { label: "API Fetch", duration: 900 },
  { label: "Deidentification", duration: 900 },
  { label: "Field Extraction", duration: 900 },
  { label: "Entity Extraction", duration: 900 },
  { label: "Health Trajectory", duration: 900 },
  { label: "Heart Risk Prediction", duration: 900 },
  { label: "Chatbot Initialization", duration: 900 },
]

interface ProgressViewProps {
  isComplete: boolean;
}

export function ProgressView({ isComplete }: ProgressViewProps) {

  const [currentStep, setCurrentStep] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout
    let progressInterval: NodeJS.Timeout

    if (isComplete) {
      // Finalize progress when API response arrives
      setOverallProgress(100)
      setIsCompleted(true)
      return () => {
        clearTimeout(stepTimeout)
        clearInterval(progressInterval)
      }
    }

    const runStep = (stepIndex: number) => {
      if (stepIndex >= progressSteps.length) {
        setIsCompleted(true)
        setOverallProgress(100)
        return
      }

      const step = progressSteps[stepIndex]
      setCurrentStep(stepIndex)

      const baseProgress = (stepIndex / progressSteps.length) * 100
      const stepProgress = (1 / progressSteps.length) * 100

      // Animate progress for current step
      let currentStepProgress = 0
      progressInterval = setInterval(() => {
        currentStepProgress += 2
        const stepCompletion = Math.min(currentStepProgress, 100)

        const totalProgress = baseProgress + (stepCompletion / 100) * stepProgress
        setOverallProgress(Math.min(totalProgress, 100))

        if (currentStepProgress >= 100) {
          clearInterval(progressInterval)
        }
      }, step.duration / 50)

      // Move to next step
      stepTimeout = setTimeout(() => {
        clearInterval(progressInterval)
        runStep(stepIndex + 1)
      }, step.duration)
    }

    runStep(0)

    return () => {
      clearTimeout(stepTimeout)
      clearInterval(progressInterval)
    }
  }, [isComplete])

  return (
    <Card className="p-6 bg-muted/30 border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {isCompleted
              ? "Analysis Complete"
              : currentStep < progressSteps.length
                ? progressSteps[currentStep].label
                : "Finalizing..."}
          </span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-primary animate-pulse"}`} />
            <span className="text-xs text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
        </div>

        <Progress value={overallProgress} className="h-2" />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Step {isCompleted ? progressSteps.length : Math.min(currentStep + 1, progressSteps.length)} of{" "}
            {progressSteps.length}
          </span>
          <span>{isCompleted ? "Ready!" : "Please wait..."}</span>
        </div>
      </div>
    </Card>
  )
}
