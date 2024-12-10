import { LineChart } from "../Twin/LineCHart";
import { useEffect, useState } from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import Select from "react-select";

const Dashboard = () => {
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [chartData, setChartData] = useState({});
  const [selectedStrains, setSelectedStrains] = useState([]);
  const [allStrains, setAllStrains] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    // Replace API call with dummy data
    const dummyData = {
      strainChartData: {
        'Strain A': {
          plantsData: [
            { date: '2024-01-01', value: 10 },
            { date: '2024-02-01', value: 15 },
            { date: '2024-03-01', value: 12 }
          ],
          gPerPlantData: [
            { date: '2024-01-01', value: 50 },
            { date: '2024-02-01', value: 55 },
            { date: '2024-03-01', value: 48 }
          ],
          yieldData: [
            { date: '2024-01-01', value: 500 },
            { date: '2024-02-01', value: 825 },
            { date: '2024-03-01', value: 576 }
          ],
          qualityData: [
            { date: '2024-01-01', value: 8 },
            { date: '2024-02-01', value: 9 },
            { date: '2024-03-01', value: 8.5 }
          ]
        },
        'Strain B': {
          plantsData: [
            { date: '2024-01-01', value: 8 },
            { date: '2024-02-01', value: 12 },
            { date: '2024-03-01', value: 14 }
          ],
          gPerPlantData: [
            { date: '2024-01-01', value: 45 },
            { date: '2024-02-01', value: 52 },
            { date: '2024-03-01', value: 50 }
          ],
          yieldData: [
            { date: '2024-01-01', value: 360 },
            { date: '2024-02-01', value: 624 },
            { date: '2024-03-01', value: 700 }
          ],
          qualityData: [
            { date: '2024-01-01', value: 7.5 },
            { date: '2024-02-01', value: 8.5 },
            { date: '2024-03-01', value: 9 }
          ]
        }
      },
      dates: ['2024-01-01', '2024-02-01', '2024-03-01']
    };

    // Set initial states with dummy data
    setAllStrains(Object.keys(dummyData.strainChartData));
    setFromDate(new Date(dummyData.dates[0]));
    setToDate(new Date(dummyData.dates[dummyData.dates.length - 1]));
    setChartData(dummyData);
    setSelectedStrains(Object.keys(dummyData.strainChartData));
  }, []);

  const handleStrainSelection = (selectedOptions) => {
    const selected = selectedOptions || [];
    setSelectedStrains(selected.map((option) => option.value));
  };

  const commonChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: "black",
          fontWeight: 700,
          padding: 5,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
          color: "black",
          fontWeight: 700,
          padding: 5,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const getChartDataset = (metric) => {
    return selectedStrains.map((strain, index) => {
      return {
        label: strain,
        data: chartData.strainChartData[strain][metric].map((d) => d.value),
        backgroundColor: `rgba(${(index + 1) * 50},99,132,0.4)`,
        borderColor: `rgba(${(index + 1) * 50},99,132,1)`,
        fill: false,
      };
    });
  };

  const strainOptions = allStrains.map((strain) => ({ label: strain, value: strain }));

  return (
    <div className="p-3">
      <div className="d-flex mb-2 date_container">
        <div className="me-2">
          <span className="labelHeading">From:</span>
          <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
        </div>
        <div>
          <span className="labelHeading">To:</span>
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '8px' }}>
          <span className="labelHeading" style={{ marginTop: '5px' }}>Plant Type:</span>
          <Select
            isMulti
            options={strainOptions}
            value={strainOptions.filter((option) => selectedStrains.includes(option.value))}
            onChange={handleStrainSelection}
            placeholder="Select Plant Type"
            className="mb-3 multiple-calss"
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isClearable={true}
            components={{
              MultiValue: ({ data, index }) => {
                const selectedCount = selectedStrains.length;
                if (index < 1) { // Show the first two strains
                  return <span>{data.label}</span>;
                }
                if (index === 1) { // After two strains, show a summary message
                  return <span>{`+${selectedCount - 2} more`}</span>;
                }
                return null; // Hide all other selected strains
              },
              MultiValueContainer: ({ children }) => children.slice(0, 3), // Ensure only two strains and the summary are rendered
            }}
          />
        </div>

      </div>

      {/* Strain Multi-Select Dropdown */}

      {selectedStrains?.length > 0 ? (
        <>
          {/* Plants Graph */}
          <div className="row">
            <div className="col gradient-color card shadow rounded m-1 p-1" style={{ height: "fit-content" }}>
              <h5 className="mt-2 mb-4">Plants (Avg)</h5>
              <LineChart
                data={{
                  labels: chartData.dates,
                  datasets: getChartDataset("plantsData"),
                }}
                height={120}
                options={commonChartOptions}
              />
            </div>
            <div className="col gradient-color card shadow rounded m-1 p-1" style={{ height: "fit-content" }}>
              <h5 className="mt-2 mb-4">g/plant (Avg)</h5>
              <LineChart
                data={{
                  labels: chartData.dates,
                  datasets: getChartDataset("gPerPlantData"),
                }}
                height={120}
                options={commonChartOptions}
              />
            </div>
          </div>

          {/* Yield Graph */}
          <div className="row">
            <div className="col gradient-color card shadow rounded m-1 p-1" style={{ height: "fit-content" }}>
              <h5 className="mt-2 mb-4">Yield (Avg)</h5>
              <LineChart
                data={{
                  labels: chartData.dates,
                  datasets: getChartDataset("yieldData"),
                }}
                height={120}
                options={commonChartOptions}
              />
            </div>
            <div className="col gradient-color card shadow rounded m-1 p-1" style={{ height: "fit-content" }}>
              <h5 className="mt-2 mb-4">Quality (Avg)</h5>
              <LineChart
                data={{
                  labels: chartData.dates,
                  datasets: getChartDataset("qualityData"),
                }}
                height={120}
                options={commonChartOptions}
              />
            </div>
          </div>

        </>
      ) : <div style={{display:'flex',justifyContent:'center'}}>Please Select Plant Type</div>}
    </div>
  );
};

export default Dashboard;
