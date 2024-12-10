import React from "react";
import DatePicker from "react-datepicker";

const FilterBar = ({
  facilities,
  plantTags,
  strains,
  facility,
  tag,
  strain,
  toDate,
  fromDate,
  setFacility,
  setTag,
  setStrain,
  setToDate,
  setFromDate,
  handleFilter,
}) => (
  <>
    <div className="d-flex mb-2 filterbar" style={{ alignItems: "center" }}>
      <label>
        <span className="labelHeading" style={{ fontWeight: 500 }}>
          Facilities:
        </span>
        <select
          className="select-css2"
          style={{ minWidth: "200px" }}
          onChange={(e) => setFacility(e.target.value)}
          value={facility}
        >
          <option>All</option>
          {facilities.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="labelHeading" style={{ fontWeight: 500 }}>
          Room:
        </span>
        <select
          className="select-css2"
          style={{ minWidth: "200px" }}
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        >
          <option>All</option>
          {plantTags.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="labelHeading" style={{ fontWeight: 500 }}>
          Plant Type:
        </span>
        <select
          className="select-css2"
          style={{ minWidth: "200px" }}
          onChange={(e) => setStrain(e.target.value)}
          value={strain}
        >
          <option>All</option>
          {strains.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <div className="date d-flex">
        <label style={{ display: "flex", flexDirection: "column" }}>
          <span className="labelHeading">To:</span>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            className="select-css2"
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          <span className="labelHeading">From:</span>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            className="select-css2"
          />
        </label>
      </div>
    </div>
    <div className="submit_btn ">
      <button className="btn btn-primary " onClick={handleFilter}>
        Submit
      </button>
    </div>
  </>
);

export default FilterBar;
