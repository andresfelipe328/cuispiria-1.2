"use client";

import React from "react";

import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  data: {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
  };
};

const CaloricBreakdown = ({ data }: Props) => {
  const labels = Object.keys(data).map((word) => {
    const sepWord = word.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
    return sepWord[1];
  });
  const dataPoints = Object.values(data);

  const PieData = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: ["#56975A", "#D26B65", "#F7C66B"],
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    datasets: {
      pie: {
        borderWidth: 2,
        borderColor: "#584A5A",
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#584A5A",
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        padding: 8,
        boxPadding: 3,
        callbacks: {
          label: (ctx: any) => {
            let label = ctx.raw;
            return [`${label}%`];
          },
        },
      },
    },
  };

  return (
    <div className="h-[200px] w-full flex items-center justify-center drop-shadow-md overflow-x-hidden">
      <Pie data={PieData} options={options} />
    </div>
  );
};

export default CaloricBreakdown;
