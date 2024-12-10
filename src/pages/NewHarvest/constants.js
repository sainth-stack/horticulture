export const options = {
    chart: {
        // height: '400px',
        // width:'100px',
        type: 'bar'
    },

    colors: [
        "#39c734",
        "#0000FF"
    ],
    plotOptions: {
        bar: {
            columnWidth: '5px',
            horizontal: false,
            borderRadius: 0,
            borderRadiusApplication: 'around',
            borderRadiusWhenStacked: 'last',
            columnWidth: '30%',
            barHeight: '40%',
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            hideZeroBarsWhenGrouped: false,
            isDumbbell: false,
            dumbbellColors: undefined,
            isFunnel: false,
            isFunnel3d: true,
            dataLabels: {
                position: 'top',
            }
        }
    },
    grid: {
        show: false
    },
    dataLabels: {
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        },
        offsetY: -20,
        formatter: function (val, opt) {
            const goals =
                opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                    .goals
            return `${val}`
        }
    },
    // colors: colors
}
export const finalData5 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'MAC',
                y: 43,
                color: "#41B883",
            },
            {
                x: 'Double Tahoe',
                y: 26,
                color: "#00D8FF",
            },
            {
                x: 'Space Queen',
                y: 14,
                color: "#00D8FF",
            },
            {
                x: 'Racon',
                y: 17,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData6 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'MAC',
                y: 238,
                color: "#41B883",
            },
            {
                x: 'Double Tahoe',
                y: 243,
                color: "#00D8FF",
            },
            {
                x: 'Space Queen',
                y: 273,
                color: "#00D8FF",
            },
            {
                x: 'Racon',
                y: 234,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData7 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'MAC',
                y: 10234,
                color: "#41B883",
            },
            {
                x: 'Double Tahoe',
                y: 6318,
                color: "#00D8FF",
            },
            {
                x: 'Space Queen',
                y: 3822,
                color: "#00D8FF",
            },
            {
                x: 'Racon',
                y: 3978,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData8 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'Blue Dream',
                y: "A",
                color: "#41B883",
            },
            {
                x: 'Sour Diesel',
                y: "B",
                color: "#00D8FF",
            },
            {
                x: 'Golden Goat',
                y: "A",
                color: "#00D8FF",
            }
        ]
    }
]




export const finalData = [
    {
        name: 'Actual',
        data: [
            {
                x: ["Blue Dream", "(02-19-2023)"],
                y: 48,
                color: "#41B883",
            },
            {
                x: ["Sour Diesel", "(02-19-2023)"],
                y: 31,
                color: "#00D8FF",
            },
            {
                x: ["Golden Goat", "(02-19-2023)"],
                y: 17,
                color: "#00D8FF",
            },
            {
                x: ["MAC", "(02-25-2023)"],
                y: 43,
                color: "#00D8FF",
            },
            {
                x: ["Double Tahoe", "(02-25-2023)"],
                y: 26,
                color: "#00D8FF",
            },
            {
                x: ["Space Queen", "(02-25-2023)"],
                y: 14,
                color: "#00D8FF",
            },
            // {
            //     x: ["Recon", "(02-25-2023)"],
            //     y: 17,
            //     color: "#00D8FF",
            // }
        ]
    }
]
export const finalData2 = [
    {
        name: 'Actual',
        data: [
            {
                x: ["Blue Dream", "(02-19-2023)"],
                y: 249,
                color: "#41B883",
            },
            {
                x: ["Sour Diesel", "(02-19-2023)"],
                y: 213,
                color: "#00D8FF",
            },
            {
                x: ["Golden Goat", "(02-19-2023)"],
                y: 250,
                color: "#00D8FF",
            },
            {
                x: ["MAC", "(02-25-2023)"],
                y: 250,
                color: "#00D8FF",
            },
            {
                x: ["Double Tahoe", "(02-25-2023)"],
                y: 250,
                color: "#00D8FF",
            },
            {
                x: ["Space Queen", "(02-25-2023)"],
                y: 273,
                color: "#00D8FF",
            },
            {
                x: ["Recon", "(02-25-2023)"],
                y: 234,
                color: "#00D8FF",
            }
        ]
    }
]
export const finalData3 = [
    {
        name: 'Actual',
        data: [
            {
                x: ["Blue Dream", "(02-19-2023)"],
                y: 11952,
                color: "#41B883",
            },
            {
                x: ["Sour Diesel", "(02-19-2023)"],
                y: 6603,
                color: "#00D8FF",
            },
            {
                x: ["Golden Goat", "(02-19-2023)"],
                y: 4250,
                color: "#00D8FF",
            },
            {
                x: ["MAC", "(02-25-2023)"],
                y: 10234,
                color: "#00D8FF",
            },
            {
                x: ["Double Tahoe", "(02-25-2023)"],
                y: 3978,
                color: "#00D8FF",
            },
            {
                x: ["Space Queen", "(02-25-2023)"],
                y: 3822,
                color: "#00D8FF",
            },
            // {
            //     x: ["Recon", "(02-25-2023)"],
            //     y: 3978,
            //     color: "#00D8FF",
            // }
        ]
    }
]
export const finalData4 = [
    {
        name: 'Actual',
        data: [
            {
                x: 'Blue Dream',
                y: "A",
                color: "#41B883",
            },
            {
                x: 'Sour Diesel',
                y: "B",
                color: "#00D8FF",
            },
            {
                x: 'Golden Goat',
                y: "A",
                color: "#00D8FF",
            }
        ]
    }
]





export const bubbleOptions = {
    series: [{
        name: 'Blue Dream',
        data: [
            [71.5,249]
        ]
    },
    {
        name: 'Soure Diesel',
        data: [
            [68,213],
        ]
    },
    {
        name: 'Golden Goat',
        data: [
            [65,250],
        ]
    },
    {
        name: 'MAC',
        data: [
            [70,238],
        ]
    },
    {
        name: 'Double Tahoe',
        data: [
            [69,243],
        ]
    },
    {
        name: 'Space Queen',
        data: [
            [72,273],
        ]
    },
    {
        name: 'Recon',
        data: [
            [61,234],
        ]
    },
    {
        name: 'Jilly Bean',
        data: [
            [68,301],
        ]
    },
    {
        name: 'Cereal Milk',
        data: [
            [60,306],
        ]
    },
    {
        name: 'Jah kush',
        data: [
            [65,235],
        ]
    },
    ],
    options: {
        chart: {
            height: 350,
            type: 'scatter',
            zoom: {
                type: 'xy'
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            },
        },
        legend: {
            position: 'top',
        },
        xaxis: {
            title: {
                display: true,
                text: 'Temperature',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            grid: {
                display: false,
            },
            tick:50
        },
        yaxis: {
            title: {
                display: true,
                text: 'g/plant',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            grid: {
                display: false
            }
        }
    },
};

export const humidityOptions = {
    series: [{
        name: 'Blue Dream',
        data: [
            [61.5,249]
        ]
    },
    {
        name: 'Soure Diesel',
        data: [
            [58,213],
        ]
    },
    {
        name: 'Golden Goat',
        data: [
            [45,250],
        ]
    },
    {
        name: 'MAC',
        data: [
            [50,238],
        ]
    },
    {
        name: 'Double Tahoe',
        data: [
            [59,243],
        ]
    },
    {
        name: 'Space Queen',
        data: [
            [62,273],
        ]
    },
    {
        name: 'Recon',
        data: [
            [51,234],
        ]
    },
    {
        name: 'Jilly Bean',
        data: [
            [48,301],
        ]
    },
    {
        name: 'Cereal Milk',
        data: [
            [40,306],
        ]
    },
    {
        name: 'Jah kush',
        data: [
            [45,235],
        ]
    },
    ],
    options: {
        chart: {
            height: 350,
            type: 'scatter',
            zoom: {
                type: 'xy'
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            },
        },
        legend: {
            position: 'top',
        },
        xaxis: {
            title: {
                display: true,
                text: 'Humidity',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            grid: {
                display: false,
            },
            tick:50
        },
        yaxis: {
            title: {
                display: true,
                text: 'g/plant',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            grid: {
                display: false
            }
        }
    },
};




