"use client"

import React from "react"
import ReactApexChart from "react-apexcharts"

type Props = {
  categories: string[]
  data: number[]
}

const DiagnosisBarChart: React.FC<Props> = ({ categories, data }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 400,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      labels: {
        rotate: -45, // rotate labels
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Frequency",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} occurrences`,
      },
    },
  }

  const series = [
    {
      name: "Diagnosis Codes",
      data,
    },
  ]

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
      />
    </div>
  )
}

export default DiagnosisBarChart
