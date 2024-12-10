import React from "react";
import RadarChart from "./radarChart";

const FacilitySection = ({ groupedByFacility }) => {
  console.log(groupedByFacility);

  return (
    <div className="facility-section">
      {Object.entries(groupedByFacility).map(([facilityName, rooms]) => (
        <div key={facilityName} className="facility-box">
          <h3>{facilityName || "NAME NOT CAME"} </h3>
          <div className="rooms-section">
            {rooms.map((room) => (
              <div key={room.room || "unknown-room"} className="room-box">
                <h4>{room?.room || "Room1"}</h4>
                <div
                  className="radar-chart-container"
                  style={{ width: "400px", height: "400px" }}
                >
                  <RadarChart roomData={room} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacilitySection;
