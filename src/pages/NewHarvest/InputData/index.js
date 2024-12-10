import { useState } from 'react';
import { CustomLegend } from "../../../components/CustomLegend";
import { LineChart } from "../../Twin/LineCHart";

const checkBoxList = ["ecin", 'ecout', 'temp', 'hum', 'lsi', 'g/sqft'];
const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: false
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
        y1: {
            min: 0,
            position: 'left',
            title: {
                display: true,
                text: 'CO2, LSI, Light Intensity',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
            ticks: {
                // stepSize: 1000// <----- This prop sets the stepSize
            }
        },
        y: {
            min: 0,
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Temp, Humidity, g/sqft, ecin, ecout',
                color: 'black',
                fontWeight: 700,
                padding: 5
            },
        },
    }
};

export const InputData = ({ batches, handleRadioChange, selectedValue, graphData }) => {
    const [selectedDatasets, setSelectedDatasets] = useState([]);

    const toggleDatasetVisibility = (dataset) => {
        setSelectedDatasets(prevState =>
            prevState.includes(dataset)
                ? prevState.filter(item => item !== dataset)
                : [...prevState, dataset]
        );
    };

    const filteredData = {
        ...graphData,
        datasets: graphData?.datasets?.filter(dataset => 
            selectedDatasets?.some(selected => dataset.label.toLowerCase().includes(selected))
        )
    };
console.log(graphData)
    return (
        <>
            {
                batches.length > 0 && (
                    <div className='card' style={{ width: '100%', overflowX: 'auto' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div className="radio-container">
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="html"
                                        name="type"
                                        value="sep"
                                        checked={selectedValue === 'sep'}
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="html">Separated</label>
                                </div>
                                <div className="radio-option">
                                    <input
                                        type="radio"
                                        id="css"
                                        name="type"
                                        value="com"
                                        checked={selectedValue === 'com'}
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="css">Combined</label>
                                </div>
                            </div>
                            {checkBoxList.map((dataset) => (
                                <label key={dataset} style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedDatasets.includes(dataset)}
                                        onChange={() => toggleDatasetVisibility(dataset)}
                                    />
                                    <span style={{ fontSize: '12px', fontWeight: 600, lineHeight: "normal", fontFamily: "poppins" }}>
                                        {dataset}
                                    </span>
                                </label>
                            ))}
                        </div>
                        <div style={{ minWidth: `${70 * 30}px`, minHeight: '40vh' /* Set the desired minimum width based on the number of days */ }}>
                            <CustomLegend datasets={filteredData} toggleDataset={toggleDatasetVisibility} />
                            <LineChart data={filteredData} height={60} options={options2} />
                        </div>
                    </div>
                )
            }
        </>
    );
};
