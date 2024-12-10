import { LineChart } from "../Twin/LineCHart";
import { useEffect, useState } from "react";
import './index.css'
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import moment from 'moment';

const AvgStrainsData = () => {
    const [toDate, setToDate] = useState(new Date("2023-01-01"));
    const [fromDate, setFromDate] = useState(new Date("2023-01-6"));
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                    color: 'black',
                    fontWeight: 700,
                    padding: 5
                },
                grid: {
                    display: false,
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature',
                    color: 'black',
                    fontWeight: 700,
                    padding: 5
                },
                grid: {
                    display: false
                }
            }
        }
    };

    const data1 = {
        labels: ['2-10-23'],
        datasets: [{
            label: 'Blue Dream',
            data: [30],
            borderColor: '#332288',
            backgroundColor: '#332288',
        }],
    };

    return (
        <div className="">
            <div className="row">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0`} >
                    <h5 className="mt-2 mb-4">Plants {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart data={data1} height={120} options={{
                        ...options, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'Plants',
                                    color: 'black',
                                    fontWeight: 700,
                                    padding: 5
                                },
                                grid: {
                                    display: false
                                }
                            }

                        }
                    }} />
                </div>
                {/* <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <h5 className="mt-2 mb-4">g/plants {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart data={getGramsPerPlantData()} height={120} options={{
                        ...options, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'g/plants',
                                    color: 'black',
                                    fontWeight: 700,
                                    padding: 5
                                },
                                grid: {
                                    display: false
                                }
                            }

                        }
                    }} />
                </div> */}
            </div>
            {/* <div className="row">
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0`}>
                    <h5 className="mt-2 mb-4">g {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart data={getGramsData()} height={120} options={{
                        ...options, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'g',
                                    color: 'black',
                                    fontWeight: 700,
                                    padding: 5
                                },
                                grid: {
                                    display: false
                                }
                            }

                        }
                    }} />
                </div>
                <div className={`col gradient-color card shadow rounded m-1 p-1 graphCardHeight border-0 me-3`}>
                    <h5 className="mt-2 mb-4">Quality {moment(toDate).format("DD/MM/YYYY")} - {moment(fromDate).format("DD/MM/YYYY")}</h5>
                    <LineChart data={getQualityData()} height={120} options={{
                        ...options, scales: {
                            ...options.scales,
                            y: {
                                title: {
                                    display: true,
                                    text: 'quantity',
                                    color: 'black',
                                    fontWeight: 700,
                                    padding: 5
                                },
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    // forces step size to be 50 units
                                    stepSize: 1,
                                    callback: function (value, index, ticks) {
                                        if (value == 1) {
                                            return 'A'
                                        } else if (value == 2) {
                                            return 'B'
                                        } else if (value == 3) {
                                            return 'C'
                                        }
                                    }
                                }
                            }

                        }
                    }} />
                </div>
            </div> */}
        </div>
    )
}

export default AvgStrainsData;