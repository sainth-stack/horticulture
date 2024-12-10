import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
//import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  const { offsetLeft: positionX } = chart.canvas;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
};


const labels = ['Feb 2023', 'Mar 2023', 'Apr 2023','May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023', 'Sep 2023'];
export const data = {
  labels,
  datasets: [
    // {
    //   label: 'Dataset 1',
    //   data: ['User 1', 'User 2', 'User 3', 'OCR4', 'OCR5', 'OCR6', 'OCR7'],
    //   backgroundColor: 'orange',
    // },
    // {
    //   label: 'Dataset 2',
    //   data: ['User 1', 'User 2', 'User 3', 'OCR4', 'OCR5', 'OCR6', 'OCR7'],
    //   backgroundColor: 'green',
    // },
    // {
    //   label: 'Dataset 1',
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
    //   backgroundColor: 'green',
    // },
    // {
    //   id: 1,
    //   label: 'Dataset 1',
    //   data: [20, 80, 7, 98, 20, 30, 40,50,10,5],
    //   backgroundColor: '#3FC429',
    // },
    {
      id: 1,
      label: 'Dataset 2',
      data: [1, 20, 20, 23,8, 44, 30,30],
      backgroundColor: 'lightBlue',
    },
  ],
};
export default function StackChart(props) {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        // text: 'Chart.js Horizontal Bar Chart',
      },
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: externalTooltipHandler
    },
    scales: {
      x: {
        title: {
          display: true,
          text:props.xtitle ||'Month',
          color:'black',
          fontWeight:700,
          padding:5
        },
        grid: {
          display: false,
        }
      },
      y: {
        title: {
          display: true,
          text: props.ytitle || 'Temparature',
          color:'black',
          fontWeight:700,
          padding:5
        },
        grid: {
          display: false
        }
      }
    }
  };
  return <Bar options={options} data={data} />
}