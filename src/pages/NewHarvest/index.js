import "./index.css";

import React, { useEffect, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import GroupedBarChart from "./barChart";
import { InputData } from "./InputData";
import axios from "axios";

Chart.register(BarElement, CategoryScale, LinearScale);

export const NewHarvest = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [graphData, setGraphData] = useState({ labels: [] });
  const [selectedValue, setSelectedValue] = useState("sep");
  const [finalHB, setFinalHB] = useState([]);

  const getRoomsData = async () => {
    try {
      const response = await axios.get(
        `https://cannatwin.com/api/getroomsdata/?email=${localStorage.getItem('email')}`
      );
      return response?.data[0];
    } catch (error) {
      console.error("Error uploading room file:", error);
    }
  };

  const getHarvestData = async () => {
    try {
      const response = await axios.get(
        `https://cannatwin.com/api/getharvestdata/?email=${localStorage.getItem('email')}`
      );
      return response?.data[0];
    } catch (error) {
      console.error("Error fetching harvest data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const room = [
        { Facility: "Facility 1", Room: "Room A", Date: "01/01/2023", Time: "12.00", "Ch:1 - Temperature (°C)": 22, "Ch:2 - RH (%)": 50, "Dew Point (°C)": 10, CO2: 400, "LSI (Red)": 100 },
        { Facility: "Facility 1", Room: "Room A", Date: "01/02/2023", Time: "12.00", "Ch:1 - Temperature (°C)": 23, "Ch:2 - RH (%)": 52, "Dew Point (°C)": 11, CO2: 420, "LSI (Red)": 105 },
      ];

      const harvest = [
        { "Harvest Batch": "Batch 1", "Wet Weight": 1000, "Waste": 100, "Bud (g)": 500, "Bud %": 0.5, "Popcorn (g)": 200, "Popcorn %": 0.2, "Shake/Trim (g)": 200, "Shake/Trim %": 0.2, "g/plant": 50, "g/sqft.": 20 },
        { "Harvest Batch": "Batch 2", "Wet Weight": 1200, "Waste": 120, "Bud (g)": 600, "Bud %": 0.55, "Popcorn (g)": 240, "Popcorn %": 0.22, "Shake/Trim (g)": 240, "Shake/Trim %": 0.22, "g/plant": 55, "g/sqft.": 22 },
      ];

      const formattedRoomData = room.map((row) => ({
        Facility: row["Facility"],
        Room: row["Room"],
        Date: row["Date"],
        Time: row["Time"],
        "Ch:1 - Temperature (°C)": row["Ch:1 - Temperature (°C)"],
        "Ch:2 - RH (%)": row["Ch:2 - RH (%)"],
        "Dew Point (°C)": row["Dew Point (°C)"],
        CO2: row["CO2"],
        "LSI (Red)": row["LSI (Red)"],
      }));
      setRoomData(formattedRoomData);

      const data = harvest.map((item, index) => ({
        ...item,
        hb: item["Harvest Batch"],
        id: index + 1,
      }));
      setFinalHB(data);

      // Update the graph data when batches change
      const graphLabels = data.map(item => item.hb);
      const graphDatasets = [
        {
          label: 'Bud',
          data: data.map(item => parseFloat(item['Bud %']) * 100),
          borderColor: '#1b3c7a',
          backgroundColor: '#1b3c7a',
        },
        {
          label: 'Shake/Trim',
          data: data.map(item => parseFloat(item['Shake/Trim %']) * 100),
          borderColor: '#427ae3',
          backgroundColor: '#427ae3',
        },
        {
          label: 'Popcorn',
          data: data.map(item => parseFloat(item['Popcorn %']) * 100),
          borderColor: '#3dc7d1',
          backgroundColor: '#3dc7d1',
        }
      ];
      
      setGraphData({
        labels: graphLabels,
        datasets: graphDatasets
      });
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (batch) => {
    const isChecked = selectedBatches.some((item) => item.hb === batch.hb);
    const updData = isChecked
      ? selectedBatches.filter((selectedBatch) => selectedBatch.hb !== batch.hb)
      : [...selectedBatches, batch];
    setSelectedBatches(updData);
    setBatches(updData);
  };

  return (
    <div>
      <div className="p-2 mt-1">
        <div className="row">
          <div className="col-md-3">
            <h2 className="heading1">Harvest Batches</h2>
            <ul className="list-group overflow-auto" style={{ maxHeight: "300px" }}>
              {finalHB.map((batch) => (
                <li key={batch.id} className="list-group-item">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`batch-${batch.hb}`}
                      checked={selectedBatches.some((item) => item.hb === batch.hb)}
                      onChange={() => handleCheckboxChange(batch)}
                    />
                    <label className="form-check-label" htmlFor={`batch-${batch.id}`}>
                      {batch.hb}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-9">
            <h2 className="heading1">Plants</h2>
            <div className="table-container" style={{ maxHeight: "300px", overflowY: "auto", display: "block" }}>
              <table className="table">
                <thead className="sticky-top">
                  <tr>
                    <th style={{ minWidth: "200px", border: "1px solid black" }}>Harvest Batch</th>
                    <th colSpan="2" style={{ border: "1px solid black" }}>Start</th>
                    <th colSpan="2" style={{ border: "1px solid black" }}>Growth</th>
                    <th colSpan="2" style={{ border: "1px solid black" }}>Final</th>
                    <th style={{ border: "1px solid black" }}>Total Weight (g)</th>
                    <th style={{ border: "1px solid black" }}>g/plant</th>
                    <th style={{ border: "1px solid black" }}>g/Sqft</th>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}></th>
                    <th style={{ border: "1px solid black" }}>g</th>
                    <th style={{ border: "1px solid black" }}>%</th>
                    <th style={{ border: "1px solid black" }}>g</th>
                    <th style={{ border: "1px solid black" }}>%</th>
                    <th style={{ border: "1px solid black" }}>g</th>
                    <th style={{ border: "1px solid black" }}>%</th>
                    <th style={{ border: "1px solid black" }}></th>
                    <th style={{ border: "1px solid black" }}></th>
                    <th style={{ border: "1px solid black" }}></th>
                  </tr>
                </thead>
                <tbody className="overflow-auto" style={{ maxHeight: "300px" }}>
                  {batches.map((batch) => {
                    const totalWeight = parseFloat(batch["Wet Weight"]) - parseFloat(batch["Waste"]);
                    const budWeight = parseFloat(batch["Bud (g)"]);
                    const popcornWeight = parseFloat(batch["Popcorn (g)"]);
                    const shakeTrimWeight = parseFloat(batch["Shake/Trim (g)"]);
                    const budPercentage = parseFloat(batch["Bud %"]) * 100;
                    const popcornPercentage = parseFloat(batch["Popcorn %"]) * 100;
                    const shakeTrimPercentage = parseFloat(batch["Shake/Trim %"]) * 100;

                    return (
                      <tr key={batch.hb}>
                        <td style={{ border: "1px solid black" }}>{batch.hb}</td>
                        <td style={{ border: "1px solid black" }}>{budWeight.toFixed(2)}</td>
                        <td style={{ border: "1px solid black" }}>{budPercentage.toFixed(0)}%</td>
                        <td style={{ border: "1px solid black" }}>{popcornWeight.toFixed(2)}</td>
                        <td style={{ border: "1px solid black" }}>{popcornPercentage.toFixed(0)}%</td>
                        <td style={{ border: "1px solid black" }}>{shakeTrimWeight.toFixed(2)}</td>
                        <td style={{ border: "1px solid black" }}>{shakeTrimPercentage.toFixed(0)}%</td>
                        <td style={{ border: "1px solid black" }}>{totalWeight.toFixed(2)}</td>
                        <td style={{ border: "1px solid black" }}>{parseFloat(batch["g/plant"]).toFixed(2)}</td>
                        <td style={{ border: "1px solid black" }}>{parseFloat(batch["g/sqft."]).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-2 mt-2">
            <h2 className="heading1">Inputs</h2>
            {batches.length > 0 && (
              <InputData {...{ batches, selectedValue, graphData }} />
            )}
          </div>
        </div>
        <div className="row mt-3 mb-2">
          <div className="col-md-12 mb-2">
            {batches.length > 0 && (
              <>
                <h2 className="heading1">BPT Detail</h2>
                <div className="card" style={{ minWidth: "800px", overflowX: "auto", height: "fit-content" }}>
                  <GroupedBarChart selBatches={selectedBatches} height={80} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
