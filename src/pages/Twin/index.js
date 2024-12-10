import { LineChart } from "./LineCHart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import "./index.css";
import moment from "moment";

export const Twin = () => {
  const [toDate, setToDate] = useState(new Date("2024-04-30"));
  const [fromDate, setFromDate] = useState(new Date("2024-04-01"));
  const [chartData, setChartData] = useState(null);

  // Generate dummy data
  const generateDummyData = () => {
    const labels = [];
    const temperature = [];
    const humidity = [];
    const co2 = [];
    const lsi = [];
    const vpd = [];

    const startDate = moment(fromDate);
    const endDate = moment(toDate);
    const daysDiff = endDate.diff(startDate, 'days');

    for (let i = 0; i <= daysDiff; i++) {
      labels.push(moment(startDate).add(i, 'days').format('YYYY-MM-DD'));
      temperature.push(Math.random() * (28 - 22) + 22); // 22-28°C
      humidity.push(Math.random() * (70 - 50) + 50); // 50-70%
      co2.push(Math.random() * (1000 - 400) + 400); // 400-1000 ppm
      lsi.push(Math.random() * (600 - 400) + 400); // 400-600
      vpd.push(Math.random() * (1.5 - 0.5) + 0.5); // 0.5-1.5
    }

    return {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperature,
          borderColor: "#88CCEE",
          backgroundColor: "#88CCEE",
          yAxisID: "y1",
        },
        {
          label: "Humidity (%)",
          data: humidity,
          borderColor: "#44AA99",
          backgroundColor: "#44AA99",
          yAxisID: "y1",
        },
        {
          label: "CO2 (ppm)",
          data: co2,
          borderColor: "#332288",
          backgroundColor: "#332288",
          yAxisID: "y",
        },
        {
          label: "LSI",
          data: lsi,
          borderColor: "#999933",
          backgroundColor: "#999933",
          yAxisID: "y",
        },
        {
          label: "VPD",
          data: vpd,
          borderColor: "#DDCC77",
          backgroundColor: "#DDCC77",
          yAxisID: "y",
        },
      ],
    };
  };

  useEffect(() => {
    setChartData(generateDummyData());
  }, [toDate, fromDate]);

  return (
    <div className="ms-2 me-2">
      <div className="row mt-3">
        <div className="d-flex gap-3 mb-3">
          <div>
            <span className="fw-bold">From:</span>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              className="form-control"
              maxDate={toDate}
            />
          </div>
          <div>
            <span className="fw-bold">To:</span>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              className="form-control"
              minDate={fromDate}
            />
          </div>
        </div>

        <div className="col-12 card shadow rounded p-3">
          {chartData && <LineChart data={chartData} options={true} />}
        </div>
      </div>
    </div>
  );
};
