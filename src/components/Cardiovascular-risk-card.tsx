// "use client"

// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Heart, TrendingDown, Shield, Info } from "lucide-react"
// import { useState } from "react"
// import { AnalysisResult } from "./ResultsView"


// interface RiskData {
//   percentage: number
//   level: "Low" | "Moderate" | "High"
//   recommendations: string[]
// }

// interface CardiovascularRiskCardProps {
//   result: AnalysisResult
// }



// export function CardiovascularRiskCard({ result }: CardiovascularRiskCardProps) {
//   const [showDetails, setShowDetails] = useState(false)

//   // const computeRisk = (): RiskData => {
//   //     const entityMap = result.entities.reduce((map, entity) => {
//   //         map[entity.type.toLowerCase()] = entity.value
//   //         return map
//   //     }, {} as Record<string, string>)

//   //     // Simple heuristic logic
//   //     const isDiabetic = entityMap["diabetics"] !== "no"
//   //     const hasHighBP = entityMap["blood pressure"] === "diagnosed"
//   //     const smokes = entityMap["smoking"] !== "no"
//   //     const drinks = entityMap["alcohol"] !== "no"

//   //     let riskCount = 0
//   //     if (isDiabetic) riskCount++
//   //     if (hasHighBP) riskCount++
//   //     if (smokes) riskCount++
//   //     if (drinks) riskCount++

//   //     let percentage = Math.min(riskCount * 25 + 5, 100)

//   //     let level: "Low" | "Moderate" | "High"
//   //     if (riskCount <= 1) {
//   //         level = "Low"
//   //     } else if (riskCount <= 3) {
//   //         level = "Moderate"
//   //     } else {
//   //         level = "High"
//   //     }

//   //     return {
//   //         percentage,
//   //         level,
//   //         recommendations: [
//   //             "Maintain regular exercise routine",
//   //             "Follow a heart-healthy diet",
//   //             "Monitor blood pressure monthly",
//   //             "Schedule annual check-ups",
//   //         ],
//   //     }
//   // }

//   // const riskData = computeRisk()
//   const percentage = Math.round(result.heartRisk.score)
//   const level = result.heartRisk.level

//   const getRiskColor = (level: string) => {
//     switch (level) {
//       case "Low":
//         return "bg-primary text-primary-foreground"
//       case "Moderate":
//         return "bg-yellow-500 text-white"
//       case "High":
//         return "bg-destructive text-destructive-foreground"
//       default:
//         return "bg-muted text-muted-foreground"
//     }
//   }

//   const getProgressColor = (level: string) => {
//     switch (level) {
//       case "Low":
//         return "bg-primary"
//       case "Moderate":
//         return "bg-yellow-500"
//       case "High":
//         return "bg-destructive"
//       default:
//         return "bg-muted"
//     }
//   }

//   // return (
//   //     <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-background to-muted/30">
//   //         <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
//   //             <CardHeader className="pb-4">
//   //                 <div className="flex items-center justify-between">
//   //                     <div className="flex items-center gap-3">
//   //                         <div className="p-3 rounded-full bg-primary/10">
//   //                             <Heart className="h-6 w-6 text-primary" />
//   //                         </div>
//   //                         <div>
//   //                             <h2 className="text-2xl font-bold text-card-foreground">Heart Attack Risk Prediction</h2>
//   //                             <p className="text-muted-foreground">AI-Powered Cardiovascular Assessment</p>
//   //                         </div>
//   //                     </div>
//   //                     <Badge variant="secondary" className="px-3 py-1">
//   //                         <Shield className="h-4 w-4 mr-1" />
//   //                         ML Verified
//   //                     </Badge>
//   //                 </div>
//   //             </CardHeader>

//   //             <CardContent className="space-y-6">
//   //                 {/* Risk Score Display */}
//   //                 <div className="text-center space-y-4">
//   //                     <div className="relative">
//   //                         <div className="text-6xl font-bold text-primary mb-2">{riskData.percentage}%</div>
//   //                         <p className="text-lg text-muted-foreground">Heart Disease Risk Score</p>
//   //                     </div>

//   //                     {/* Risk Level Badge */}
//   //                     <div className="flex justify-center">
//   //                         <Badge className={`${getRiskColor(riskData.level)} px-4 py-2 text-lg font-semibold`}>
//   //                             <TrendingDown className="h-4 w-4 mr-2" />
//   //                             {riskData.level} Risk
//   //                         </Badge>
//   //                     </div>
//   //                 </div>

//   //                 {/* Progress Visualization */}
//   //                 <div className="space-y-3">
//   //                     <div className="flex justify-between text-sm text-muted-foreground">
//   //                         <span>Risk Assessment</span>
//   //                         <span>{riskData.percentage}% of 100%</span>
//   //                     </div>
//   //                     <div className="relative">
//   //                         <Progress value={riskData.percentage} className="h-3 bg-muted" />
//   //                         <div
//   //                             className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ${getProgressColor(riskData.level)}`}
//   //                             style={{ width: `${riskData.percentage}%` }}
//   //                         />
//   //                     </div>
//   //                     <div className="flex justify-between text-xs text-muted-foreground">
//   //                         <span>Low Risk</span>
//   //                         <span>Moderate Risk</span>
//   //                         <span>High Risk</span>
//   //                     </div>
//   //                 </div>
//   //             </CardContent>
//   //         </Card>
//   //     </div>
//   // )

//   return (
//     <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-background to-muted/30">
//       <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
//         <CardHeader className="pb-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-3 rounded-full bg-primary/10">
//                 <Heart className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-card-foreground">Heart Attack Risk Prediction</h2>
//                 <p className="text-muted-foreground">AI-Powered Cardiovascular Assessment</p>
//               </div>
//             </div>
//             <Badge variant="secondary" className="px-3 py-1">
//               <Shield className="h-4 w-4 mr-1" />
//               ML Verified
//             </Badge>
//           </div>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {/* Risk Score Display */}
//           <div className="text-center space-y-4">
//             <div className="relative">
//               <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
//               <p className="text-lg text-muted-foreground">Heart Disease Risk Score</p>
//             </div>

//             {/* Risk Level Badge */}
//             <div className="flex justify-center">
//               <Badge className={`${getRiskColor(level)} px-4 py-2 text-lg font-semibold`}>
//                 <TrendingDown className="h-4 w-4 mr-2" />
//                 {level} Risk
//               </Badge>
//             </div>
//           </div>

//           {/* Progress Visualization */}
//           <div className="space-y-3">
//             <div className="flex justify-between text-sm text-muted-foreground">
//               <span>Risk Assessment</span>
//               <span>{percentage}% of 100%</span>
//             </div>
//             <div className="relative">
//               <Progress value={percentage} className="h-3 bg-muted" />
//               <div
//                 className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ${getProgressColor(level)}`}
//                 style={{ width: `${percentage}%` }}
//               />
//             </div>
//             <div className="flex justify-between text-xs text-muted-foreground">
//               <span>Low Risk</span>
//               <span>Moderate Risk</span>
//               <span>High Risk</span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, TrendingDown, Shield, Info } from "lucide-react"
import { useState } from "react"
import { AnalysisResult } from "./ResultsView"


interface RiskData {
  percentage: number
  level: "Low" | "Moderate" | "High"
  recommendations: string[]
}

interface CardiovascularRiskCardProps {
  result: AnalysisResult
}



export function CardiovascularRiskCard({ result }: CardiovascularRiskCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  
  const percentage = Math.round(result.heartRisk.score)
  const level = result.heartRisk.level

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-primary text-primary-foreground"
      case "Moderate":
        return "bg-yellow-500 text-white"
      case "High":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getProgressColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-primary"
      case "Moderate":
        return "bg-yellow-500"
      case "High":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

 

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-background to-muted/30">
      <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-card-foreground">Heart Attack Risk Prediction</h2>
                <p className="text-muted-foreground">AI-Powered Cardiovascular Assessment</p>
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              <Shield className="h-4 w-4 mr-1" />
              ML Verified
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Risk Score Display */}
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
              <p className="text-lg text-muted-foreground">Heart Disease Risk Score</p>
            </div>

            {/* Risk Level Badge */}
            <div className="flex justify-center">
              <Badge className={`${getRiskColor(level)} px-4 py-2 text-lg font-semibold`}>
                <TrendingDown className="h-4 w-4 mr-2" />
                {level} 
              </Badge>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Risk Assessment</span>
              <span>{percentage}% of 100%</span>
            </div>
            <div className="relative">
              <Progress value={percentage} className="h-3 bg-muted" />
              <div
                className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ${getProgressColor(level)}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Risk</span>
              <span>Moderate Risk</span>
              <span>High Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
