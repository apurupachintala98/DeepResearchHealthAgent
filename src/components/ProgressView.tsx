"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const progressSteps = [
  { label: "Deidentification", duration: 900 },
  { label: "Field Extraction", duration: 900 },
  { label: "Entity Extraction", duration: 900 },
  { label: "Health Trajectory", duration: 900 },
  { label: "Heart Risk Prediction", duration: 900 },
  { label: "Chatbot Initialization", duration: 900 },
    { label: "API Fetch", duration: 900 },
]

interface ProgressViewProps {
  isProcessing: boolean;
  onComplete: () => void;
}

export function ProgressView({ isProcessing, onComplete }: ProgressViewProps) {

  const [currentStep, setCurrentStep] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

 useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    let stepInterval: NodeJS.Timeout | undefined

    if (!isProcessing) {
      setOverallProgress(100)
      clearInterval(interval)
      clearInterval(stepInterval)
      const timer = setTimeout(() => {
        onComplete()
      }, 300)
      return () => clearTimeout(timer)
    }

    let progress = 0
    interval = setInterval(() => {
      progress += 1
      if (progress >= 98) progress = 98
      setOverallProgress(progress)
    }, 50)

    // Cycle through steps every 1.5 seconds
     stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < progressSteps.length - 1) {
          return prev + 1
        } else {
          // Stay on the last step ("API Fetch")
          return prev
        }
      })
    }, 1500)
    
    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [isProcessing, onComplete])

  return (
    <Card className="p-6 bg-muted/30 border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {progressSteps[currentStep].label}
          </span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-primary animate-pulse"}`} />
            <span className="text-xs text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
        </div>

        <Progress value={overallProgress} className="h-2" />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{isProcessing ? "Please wait..." : "Almost done!"}</span>
          <span>{isProcessing ? "" : "Ready!"}</span>
        </div>
      </div>
    </Card>
  )
}
