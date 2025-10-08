"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"

type GraphData = {
  categories?: string[]
  data?: number[]
  graph_type: string
  title: string
  [key: string]: any
}

type ChartRendererProps = {
  graphData: GraphData
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658", "#ff7300"]

export function ChartRenderer({ graphData }: ChartRendererProps) {
  const { categories, data, graph_type, title } = graphData

  // Transform data for charts
  const chartData =
    categories && data
      ? categories.map((category, index) => ({
        name: category,
        value: data[index] || 0,
      }))
      : []

  const renderChart = () => {
    switch (graph_type) {
      case "diagnosis_frequency":
        // Bar chart for ICD-10 diagnosis code occurrences
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} occurrences`, "Frequency"]}
                labelFormatter={(label) => `Diagnosis: ${label}`}
              />
              <Legend />
              {/* <Bar dataKey="value" fill="#0088FE" name="Frequency" /> */}
              <Bar dataKey="value" fill="#0088FE" name="Frequency" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        )

      case "medication_distribution":
        // Pie chart for medication usage patterns
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Usage Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      case "risk_assessment":
        // Horizontal bar chart for health risk percentages
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}%`, "Risk Level"]} />
              <Legend />
              {/* <Bar dataKey="value" fill="#FF8042" name="Risk %" /> */}
              <Bar dataKey="value" fill="#FF8042" name="Risk %" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        )

      case "timeline":
        // Line chart for healthcare activities over time
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value}`, "Activity Count"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                name="Activities"
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case "condition_distribution":
        // Pie chart for medical condition presence
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Patient Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      case "bar_chart":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Bar dataKey="value" fill="#0088FE" /> */}
              <Bar dataKey="value" fill="#0088FE" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        )

      case "pie_chart":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )

      case "line_chart":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )

      case "scatter_plot":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={chartData}>
              <CartesianGrid />
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter dataKey="value" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        )

      case "histogram":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Bar dataKey="value" fill="#00C49F" /> */}
              <Bar dataKey="value" fill="#00C49F" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        )

      case "error":
        return (
          <div className="flex items-center justify-center h-64 text-red-500">
            <p>Error generating chart</p>
          </div>
        )

      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Bar dataKey="value" fill="#0088FE" /> */}
              <Bar dataKey="value" fill="#0088FE" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  )
}
