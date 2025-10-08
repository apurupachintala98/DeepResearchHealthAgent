// "use client"

// import { useEffect, useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"

// const progressSteps = [
//   { label: "Deidentification", duration: 900 },
//   { label: "Field Extraction", duration: 900 },
//   { label: "Entity Extraction", duration: 900 },
//   { label: "Health Trajectory", duration: 900 },
//   { label: "Heart Risk Prediction", duration: 900 },
//   { label: "Chatbot Initialization", duration: 900 },
//     { label: "API Fetch", duration: 900 },
// ]

// interface ProgressViewProps {
//   isProcessing: boolean;
//   onComplete: () => void;
// }

// export function ProgressView({ isProcessing, onComplete }: ProgressViewProps) {

//   const [currentStep, setCurrentStep] = useState(0)
//   const [overallProgress, setOverallProgress] = useState(0)
//   const [isCompleted, setIsCompleted] = useState(false)

//  useEffect(() => {
//     let interval: NodeJS.Timeout | undefined
//     let stepInterval: NodeJS.Timeout | undefined

//     if (!isProcessing) {
//       setOverallProgress(100)
//       clearInterval(interval)
//       clearInterval(stepInterval)
//       const timer = setTimeout(() => {
//         onComplete()
//       }, 300)
//       return () => clearTimeout(timer)
//     }

//     let progress = 0
//     interval = setInterval(() => {
//       progress += 1
//       if (progress >= 98) progress = 98
//       setOverallProgress(progress)
//     }, 50)

//     // Cycle through steps every 1.5 seconds
//      stepInterval = setInterval(() => {
//       setCurrentStep((prev) => {
//         if (prev < progressSteps.length - 1) {
//           return prev + 1
//         } else {
//           // Stay on the last step ("API Fetch")
//           return prev
//         }
//       })
//     }, 1500)
    
//     return () => {
//       clearInterval(interval)
//       clearInterval(stepInterval)
//     }
//   }, [isProcessing, onComplete])

//   return (
//     <Card className="p-6 bg-muted/30 border-border">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium text-foreground">
//             {progressSteps[currentStep].label}
//           </span>
//           <div className="flex items-center space-x-2">
//             <div className={`w-2 h-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-primary animate-pulse"}`} />
//             <span className="text-xs text-muted-foreground">{Math.round(overallProgress)}%</span>
//           </div>
//         </div>

//         <Progress value={overallProgress} className="h-2" />

//         <div className="flex justify-between text-xs text-muted-foreground">
//           <span>{isProcessing ? "Please wait..." : "Almost done!"}</span>
//           <span>{isProcessing ? "" : "Ready!"}</span>
//         </div>
//       </div>
//     </Card>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface ProgressViewProps {
  isProcessing: boolean;
  onComplete: () => void;
}

export function ProgressView({ isProcessing, onComplete }: ProgressViewProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (!isProcessing) {
      setIsCompleted(true)
      timer = setTimeout(() => {
        onComplete()
      }, 300)
    }

    return () => clearTimeout(timer)
  }, [isProcessing, onComplete])

  return (
    <Card className="p-6 bg-muted/30 border-border">
      <div className="space-y-4">
        {/* Status Message */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Doing deep research...
          </span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-primary animate-pulse"}`} />
            <span className="text-xs text-muted-foreground animate-pulse">Loading...</span>
          </div>
        </div>

        {/* Multicolor Gradient Loader with Shimmer */}
        <div className="relative h-2 w-full rounded-full overflow-hidden bg-muted">
          {/* Gradient Fill */}
          <div
            className="absolute top-0 left-0 h-full animate-gradient-x"
            style={{
              width: '100%',
              background: 'linear-gradient(270deg, #e01cd5, #1CB5E0, #9333ea, #3b82f6)',
              backgroundSize: '400% 400%',
            }}
          />
          {/* Shimmer Overlay */}
          <div className="absolute top-0 left-0 w-full h-full shimmer-overlay" />
        </div>

        {/* Footer Message */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{isProcessing ? "Please wait..." : "Almost done!"}</span>
          <span>{isProcessing ? "" : "Ready!"}</span>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-x {
          animation: gradient-x 2s infinite linear;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .shimmer-overlay {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
          pointer-events: none;
        }
      `}</style>
    </Card>
  )
}