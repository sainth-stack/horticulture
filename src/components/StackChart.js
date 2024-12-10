import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  plugins: {
    title: {
      display: false,
      text: "Chart.js Bar Chart - Stacked"
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
};

const labels = ["Jan 30,2023", "Feb 6,2023", "Feb 16,2023", "Feb 30,2023", "Mar 16,2023","Mar 16,2023"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [5,8],
      backgroundColor: "tomato",
      stack: "Stack 0"
    },
    {
      label: "Dataset 2",
      data: [3,2],
      backgroundColor: "lightgreen",
      stack: "Stack 0"
    },
  ]
};

export default function StackChart() {
  return <Bar options={options} data={data} style={{height:'300px'}}/>;
}
