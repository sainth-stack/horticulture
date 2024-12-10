import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import moment from 'moment';

export const FormatData = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert('Please upload a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Process the data
      const processedData = generateSyntheticData();

      // Convert processed data back to a worksheet
      const newWorksheet = XLSX.utils.json_to_sheet(processedData);
      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');

      // Convert the workbook to a binary string
      const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'binary' });

      // Create a blob from the binary string
      const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a link element, set its href to the blob URL, and trigger a download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Latest_Cannatwin_Data.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    reader.readAsArrayBuffer(file);
  };

  const generateSyntheticData = () => {
    // Helper function to generate random numbers within a range
    const randomInRange = (min, max) => {
      return (Math.random() * (max - min) + min).toFixed(2);
    };
  
    const startDate = moment('01/01/2024', 'MM/DD/YYYY');
    const endDate = moment('12/31/2024', 'MM/DD/YYYY');
    const syntheticData = [];
  
    let currentDate = startDate.clone();
  
    // Generate synthetic data for each day
    while (currentDate <= endDate) {
      const facility = `Facility${Math.floor(Math.random() * 5) + 1}`; // Randomly pick a facility (1-5)
      const room = `Room${Math.floor(Math.random() * 10) + 1}`; // Randomly pick a room (1-10)
      
      // Generate random values for each metric
      const temperature = randomInRange(15, 30); // Temperature in °C
      const humidity = randomInRange(30, 70); // Humidity in %
      const dewPoint = randomInRange(0, 20); // Dew Point in °C
      const co2 = randomInRange(400, 1500); // CO2 levels in ppm
      const lsi = randomInRange(400, 1000); // LSI (Red)
  
      // Create a new record for the current day
      syntheticData.push({
        Facility: facility,
        Room: room,
        Date: currentDate.format('M/D/YYYY'),
        "Ch:1 - Temperature   (°C)": temperature,
        "Ch:2 - RH   (%)": humidity,
        "Dew Point   (°C)": dewPoint,
        CO2: co2,
        "LSI (Red)": lsi,
        Time: "12:00:00 AM" // Set default time for each day
      });
  
      // Move to the next day
      currentDate.add(1, 'days');
    }
  
    return syntheticData;
  };
  
  // Example usage
  const yearData = generateSyntheticData();
  console.log(yearData);
  
  

  // Helper function to convert a string to an ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  };

  return (
    <div>
      <h1>Format Excel Data</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Process and Download</button>
    </div>
  );
};
