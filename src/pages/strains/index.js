import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./components/filter";
import FacilitySection from "./components/facilitySection";
import "./index.css";
import PrepLoader from "../../components/prep-loader/loader";

export const Photosynthesis = () => {
  const [toDate, setToDate] = useState(new Date("2023-01-01"));
  const [fromDate, setFromDate] = useState(new Date("2023-01-10"));
  const [tag, setTag] = useState("All");
  const [strain, setStrain] = useState("All");
  const [facility, setFacility] = useState("All");
  const [loading, setLoading] = useState(false);
  const [finData, setFinData] = useState([]);
  const [data, setData] = useState([]);
  const [plantTags, setPlantTags] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [strains, setStrains] = useState([]);

  // Function to safely access nested properties
  const safeGet = (obj, path, defaultValue = 0) => {
    return path
      .split(".")
      .reduce((o, p) => (o && o[p] !== undefined ? o[p] : defaultValue), obj);
  };

  const transformData = (data) => {
    const summary = data.reduce((acc, item) => {
      const facility = safeGet(item, "Facility");
      const room = safeGet(item, "Room");

      if (!acc[facility]) {
        acc[facility] = { rooms: {} };
      }

      if (!acc[facility].rooms[room]) {
        acc[facility].rooms[room] = {
          data: {
            PPFD: { value: 0, min: 0, max: 2000 },
            Temp: { value: 0, min: 0, max: 100 },
            PPM: { value: 0, min: 0, max: 2000 },
            Hum: { value: 0, min: 0, max: 100 },
          },
        };
      }

      acc[facility].rooms[room].data.PPFD.value += safeGet(item, "CO2");
      acc[facility].rooms[room].data.Temp.value += safeGet(
        item,
        "Ch:1 - Temperature   (°C)"
      );
      acc[facility].rooms[room].data.PPM.value += safeGet(item, "LSI (Red)");
      acc[facility].rooms[room].data.Hum.value += safeGet(
        item,
        "Ch:2 - RH   (%)"
      );

      return acc;
    }, {});

    return Object.keys(summary).map((facility) => ({
      facility,
      rooms: Object.keys(summary[facility].rooms).map((room) => ({
        room,
        data: {
          PPFD: {
            value: summary[facility].rooms[room].data.PPFD.value / data.length,
            min: 0,
            max: 2000,
          },
          Temp: {
            value: summary[facility].rooms[room].data.Temp.value / data.length,
            min: 0,
            max: 100,
          },
          PPM: {
            value: summary[facility].rooms[room].data.PPM.value / data.length,
            min: 0,
            max: 2000,
          },
          Hum: {
            value: summary[facility].rooms[room].data.Hum.value / data.length,
            min: 0,
            max: 100,
          },
        },
      })),
    }));
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://cannatwin.com/api/getroomsdata/?email=${localStorage.getItem(
            "email"
          )}`,
          {
            params: {
              fromDate: fromDate.toISOString().split("T")[0],
              toDate: toDate.toISOString().split("T")[0],
            },
          }
        );

        console.log("Room Data API Response:", response.data);

        const responseData = response.data.flat();

        if (Array.isArray(responseData) && responseData.length > 0) {
          const transformedData = transformData(responseData);
          setData(transformedData);
          setFinData(responseData);
        } else {
          console.error("Unexpected data format:", responseData);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
        // alert("Error fetching room data");
      } finally {
        setLoading(false);
      }
    };

    const fetchStrainData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://cannatwin.com/api/getharvestdata/?email=${localStorage.getItem(
            "email"
          )}`
        );

        console.log("Strain Data API Response:", response.data);

        if (Array.isArray(response.data)) {
          const fetchedStrains = response.data.map((strain) => ({
            label: strain.name,
            value: strain.name,
          }));
          setStrains(fetchedStrains);
        } else {
          console.error("Unexpected strain data format:", response.data);
          setStrains([]);
        }
      } catch (error) {
        console.error("Error fetching strain data:", error);
        // alert("Error fetching strain data");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
    fetchStrainData();
  }, [fromDate, toDate]);

  const handleFilter = () => {
    let filtered = data;

    if (facility !== "All") {
      filtered = filtered.filter((d) => d.facility === facility);
    }

    if (tag !== "All") {
      filtered = filtered
        .map((facilityData) => ({
          ...facilityData,
          rooms: facilityData.rooms.filter((room) => room.room === tag),
        }))
        .filter((facilityData) => facilityData.rooms.length > 0);
    }

    if (strain !== "All") {
      filtered = filtered
        .map((facilityData) => ({
          ...facilityData,
          rooms: facilityData.rooms
            .map((room) => ({
              ...room,
              strains: room.strains.filter((s) => s.strain === strain),
            }))
            .filter((room) => room.strains.length > 0),
        }))
        .filter((facilityData) => facilityData.rooms.length > 0);
    }

    setData(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [facility, tag, strain, data]);

  const groupedByFacility = data.reduce((acc, facilityData) => {
    if (!acc[facilityData.facility]) {
      acc[facilityData.facility] = [];
    }
    acc[facilityData.facility].push(...facilityData.rooms);
    return acc;
  }, {});

  return (
    <div>
      <FilterBar
        facilities={facilities}
        plantTags={plantTags}
        strains={strains}
        facility={facility}
        tag={tag}
        strain={strain}
        toDate={toDate}
        fromDate={fromDate}
        setFacility={setFacility}
        setTag={setTag}
        setStrain={setStrain}
        setToDate={setToDate}
        setFromDate={setFromDate}
        handleFilter={handleFilter}
      />
      {loading ? (
        <PrepLoader />
      ) : (
        <div>
          {data.length > 0 ? (
            <FacilitySection groupedByFacility={groupedByFacility} />
          ) : (
            "No Data Found"
          )}
        </div>
      )}
    </div>
  );
};
