"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, User, Cigarette, Wine, Heart, TrendingUp, Shield, AlertTriangle } from "lucide-react"
import Image from "next/image"

interface HealthMetric {
  id: string
  label: string
  value: string
  status: "positive" | "negative" | "neutral" | "warning"
  icon: React.ReactNode
  description: string
  trend?: number
}

interface EntityExtractionData {
  diabetics: string
  age_group: string
  age: number
  smoking: string
  alcohol: string
  blood_pressure: string
  medical_conditions?: string[]
}

interface HealthAnalyticsDashboardProps {
  result?: {
    entities: { type: string; value: string }[]
  }
}

const transformApiDataToMetrics = (data: EntityExtractionData): HealthMetric[] => {
  return [
    {
      id: "diabetes",
      label: "Diabetes Status",
      value: data.diabetics.toUpperCase(),
      status: data.diabetics === "no" ? "positive" : "warning",
      icon: <Activity className="h-5 w-5" />,
      description: data.diabetics === "no" ? "No diabetes indicators detected" : "Diabetes condition identified",
      trend: data.diabetics === "no" ? 0 : undefined,
    },
    {
      id: "age",
      label: "Age Group",
      value: `${data.age_group.toUpperCase()} (${data.age})`,
      status: "neutral",
      icon: <User className="h-5 w-5" />,
      description: `${data.age_group} demographic classification, age ${data.age}`,
    },
    {
      id: "smoking",
      label: "Smoking Status",
      value: data.smoking.toUpperCase(),
      status: data.smoking === "no" ? "positive" : "negative",
      icon: <Cigarette className="h-5 w-5" />,
      description: data.smoking === "no" ? "Non-smoker profile confirmed" : "Smoking habit identified",
      trend: data.smoking === "no" ? 0 : undefined,
    },
    {
      id: "alcohol",
      label: "Alcohol Consumption",
      value: data.alcohol.toUpperCase(),
      status: data.alcohol === "no" ? "positive" : "warning",
      icon: <Wine className="h-5 w-5" />,
      description: data.alcohol === "no" ? "No alcohol consumption reported" : "Alcohol consumption reported",
      trend: data.alcohol === "no" ? 0 : undefined,
    },
    {
      id: "blood_pressure",
      label: "Blood Pressure",
      value: data.blood_pressure.toUpperCase(),
      status: data.blood_pressure === "diagnosed" ? "warning" : "positive",
      icon: <Heart className="h-5 w-5" />,
      description:
        data.blood_pressure === "diagnosed" ? "Hypertension under medical supervision" : "Normal blood pressure",
      trend: data.blood_pressure === "diagnosed" ? -5 : 0,
    },
  ]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "positive":
      return "bg-chart-1/10 text-chart-1 border-chart-1/20"
    case "negative":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "warning":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "positive":
      return <Shield className="h-3 w-3" />
    case "warning":
      return <AlertTriangle className="h-3 w-3" />
    default:
      return null
  }
}

export function HealthAnalyticsDashboard({ result }: HealthAnalyticsDashboardProps) {
  // Extract entity values from result.entities and build data object
  const entityMap =
    result?.entities.reduce(
      (map, entity) => {
        map[entity.type.toLowerCase()] = entity.value
        return map
      },
      {} as Record<string, string>,
    ) || {}

  const data: EntityExtractionData = {
    diabetics: entityMap["diabetics"] || "no",
    age_group: entityMap["age group"] || "senior",
    age: Number.parseInt(entityMap["age"]) || 69,
    smoking: entityMap["smoking"] || "no",
    alcohol: entityMap["alcohol"] || "no",
    blood_pressure: entityMap["blood pressure"] || "diagnosed",
    medical_conditions: entityMap["medical conditions"] ? entityMap["medical conditions"].split(",") : [],
  }

  const healthMetrics = transformApiDataToMetrics(data)

  const getRiskLevel = () => {
    const riskFactors = [
      data.diabetics !== "no",
      data.smoking !== "no",
      data.alcohol !== "no",
      data.blood_pressure === "diagnosed",
    ].filter(Boolean).length

    if (riskFactors === 0) return { level: "Low Risk", color: "bg-chart-1 text-white hover:bg-chart-1/90" }
    if (riskFactors <= 2) return { level: "Moderate Risk", color: "bg-chart-3 text-white hover:bg-chart-3/90" }
    return { level: "High Risk", color: "bg-destructive text-white hover:bg-destructive/90" }
  }

  const riskAssessment = getRiskLevel()

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/10 p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-balance">Entity Extraction</h1>
              <p className="text-muted-foreground text-lg">Enhanced Entity Extraction & Health Analytics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-chart-1" />
              <span className="text-sm font-medium">Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-chart-1" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-chart-1" />
              <span className="text-sm font-medium">AI-Powered Insights</span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-32 opacity-20">
          <Image
            src="/images/health-analytics-hero.jpg"
            alt="Health Analytics"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-5 gap-4 min-w-0">
        {healthMetrics.map((metric) => (
          <Card
            key={metric.id}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm bg-card/50 backdrop-blur-sm min-w-0"
          >
            <CardHeader className="pb-2 px-3 pt-3">
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {metric.icon}
                </div>
                {getStatusIcon(metric.status) && (
                  <div className={`p-1 rounded-full ${getStatusColor(metric.status)}`}>
                    {getStatusIcon(metric.status)}
                  </div>
                )}
              </div>
              <CardTitle className="text-xs font-medium text-muted-foreground truncate">{metric.label}</CardTitle>
            </CardHeader>

            <CardContent className="pt-0 px-3 pb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold truncate">{metric.value}</span>
                  {metric.trend !== undefined && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        metric.trend > 0 ? "text-chart-1" : metric.trend < 0 ? "text-chart-3" : "text-muted-foreground"
                      }`}
                    >
                      {metric.trend > 0 ? "+" : ""}
                      {metric.trend}%
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{metric.description}</p>

                {metric.status === "warning" && <Progress value={75} className="h-1" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
