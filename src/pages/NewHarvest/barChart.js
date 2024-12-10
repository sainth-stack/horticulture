import React from 'react';
import { Bar } from 'react-chartjs-2';

const GroupedBarChart = ({ selBatches,height }) => {
  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 51) + 50; // Generates a random number between 50 and 100
    return newRandomNumber;
  };
  const getData = () => {
    const labels = []
    const datasets = [
      {
        label: 'Start',
        data: [],
        backgroundColor: '#1b3c7a',
        borderColor: '#1b3c7a',
      },
      {
        label: 'Growth',
        data: [],
        backgroundColor: '#427ae3',
        borderColor: '#427ae3',
        
      },
      {
        label: 'Final',
        data: [],
        backgroundColor: '#3dc7d1',
        borderColor: '#3dc7d1',
      }
    ]
    selBatches.map((item) => {
      labels.push(item.hb)
      datasets[0].data.push(item['Bud %'] *100)
      datasets[1].data.push(item['Shake/Trim %']* 100)
      datasets[2].data.push(item['Popcorn %'] * 100)
    })
    return {
      labels: labels,
      datasets: datasets
    }
  }

  const toptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ["#1b3c7a", "#427ae3", "#3dc7d1", '#faa93e'],
    fill: {
      colors: ["#1b3c7a", "#427ae3", "#3dc7d1", '#faa93e']
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    yaxis: {
      title: {
        text: 'Throughout (units)'
      }
    },
    xaxis: {
      title: {
        text: 'Month'
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    },
    scales: {
      x: {
          title: {
              display: true,
              text: '',
              color: 'black',
              fontWeight: 700,
              padding: 5
          },
          grid: {
              display: true,
          },
      },
      y: {
          title: {
              display: true,
              text: '',
              color: 'black',
              fontWeight: 700,
              padding: 5
          },
          grid: {
              display: true
          },
          suggestedMin: 0,
      }
  },
  };

  return <Bar data={getData()} height={height} options={{
    ...toptions
}}/>;
};

export default GroupedBarChart;
