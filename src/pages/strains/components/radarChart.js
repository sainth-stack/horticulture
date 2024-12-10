import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, Tooltip, Legend, LineElement, Filler } from 'chart.js';

ChartJS.register(RadialLinearScale, Tooltip, Legend, LineElement, Filler);

const normalize = (value, min, max) => ((value - min) / (max - min)) * 100;

const levels = [
    { label: 'Danger', values: [300, 10, 300, 10], color: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' }, // Red
    { label: 'One', values: [800, 30, 800, 30], color: 'rgba(255, 159, 64, 0.2)', borderColor: 'rgba(255, 159, 64, 1)' },  // Orange
    { label: 'Three', values: [1100, 50, 1100, 50], color: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' }, // Teal
    { label: 'Four', values: [1400, 65, 1400, 65], color: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)' },  // Blue
    { label: 'Five', values: [1600, 70, 1600, 70], color: 'rgba(153, 102, 255, 0.2)', borderColor: 'rgba(153, 102, 255, 1)' }  // Purple
];

const getRadarData = (roomData) => {
    return {
        labels: ['PPFD', 'Temp', 'PPM', 'Hum'],
        datasets: [
            ...levels.map((level) => ({
                label: level.label,
                data: [
                    normalize(level.values[0], 0, 2000),
                    normalize(level.values[1], 0, 100),
                    normalize(level.values[2], 0, 2000),
                    normalize(level.values[3], 0, 100),
                ],
                borderColor: level.borderColor,
                backgroundColor: level.color,
                borderWidth: 2,
                borderDash: [2, 2],
                pointBackgroundColor: level.borderColor,  // Updated
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: level.borderColor,  // Updated
                pointHoverBorderColor: '#fff',
                pointStyle: 'rectRot',
                pointRadius: 2,
                fill: level.label === 'Danger',
            })),
            {
                label: 'Real Data',
                data: [
                    normalize(roomData.data.PPFD.value, 0, 2000),
                    normalize(roomData.data.Temp.value, 0, 100),
                    normalize(roomData.data.PPM.value, 0, 2000),
                    normalize(roomData.data.Hum.value, 0, 100),
                ],
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 0, 0, 1)',  // Updated
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 1)',  // Updated
                pointHoverBorderColor: '#fff',
                pointStyle: 'circle',
                pointRadius: 2,
            }
        ],
    };
};

const getOptions = () => {
    return {
        scales: {
            r: {
                min: 0,
                max: 100,
                ticks: {
                    beginAtZero: true,
                    callback: function (value) {
                        if (value === 0) return '0';
                        if (value === 25) return '500';
                        if (value === 50) return '1000';
                        if (value === 75) return '1500';
                        if (value === 100) return '2000';
                        return value;
                    },
                    stepSize: 25,
                },
                pointLabels: {
                    fontSize: 14,
                },
                angleLines: {
                    display: true,
                    lineWidth: 1,
                },
                grid: {
                    display: true,
                    borderColor: '#ccc',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const datasetLabel = context.dataset.label || '';
                        const value = context.raw;
                        return `${datasetLabel}: ${value.toFixed(2)}`;
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 6,
                pointStyle: 'circle',
                borderWidth: 2,
            },
        },
    };
};

const RadarChart = ({ roomData }) => {
    const radarData = getRadarData(roomData);
    const options = getOptions();
    return <Radar data={radarData} options={options} />;
};

export default RadarChart;
