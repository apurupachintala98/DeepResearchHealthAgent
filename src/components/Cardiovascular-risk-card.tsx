"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, TrendingDown, Shield, Info } from "lucide-react"
import { useState, useEffect } from "react"
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
   const [animatedPercentage, setAnimatedPercentage] = useState(0)

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

 useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 100) // slight delay before starting animation
    return () => clearTimeout(timeout)
  }, [percentage])

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-background to-muted/30">
      <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm" style={{ border: "1px solid #e9e9e9" }}>
        <CardHeader className="pb-4" style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
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
             <Progress value={animatedPercentage} className={`h-3 ${getProgressColor(level)} transition-all duration-1000 ease-out`} />
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
