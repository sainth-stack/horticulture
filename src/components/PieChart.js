import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart({ performanceData }) {
  const data = {
    labels: ["Initiate","Planning","Execution","Closeout"],
    datasets: [
      {
        label: 'Performance Review Status',
        data: [15,1,22,11],
        backgroundColor: [
          "lightblue",
          "tomato",
          "lightgreen",
          "darkgreen"
        ],
        borderColor: [
          "lightblue",
          "tomato",
          "lightgreen",
          "darkgreen"
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
    }
  }
  return <Doughnut data={data} options={options} />;
}