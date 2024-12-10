import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "@mui/material";
import "./styles.css";

export default function SidebarV2({ isSidebarOpen, setIsSidebarOpen }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  return (
    <div className={`zindex99 ${isSmallScreen ? "mobile-sidebar-container" : ""}`}>
      {isSmallScreen && !isSidebarOpen && (
        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>
      )}

      <div
        className={`sidebar shadow sidebar-scroll sticky-top bg-white ${isSidebarOpen ? "open" : ""}`}
        style={{ height: "100vh", position: isSmallScreen ? "absolute" : "fixed" }}
      >
        {isSmallScreen && isSidebarOpen && (
          <button
            className="sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        )}

        <div style={{ marginTop: "5px", marginBottom: "50px" }}>
          {/* <img src={Logo} style={{ width: '160px' }} id="logo_RL" /> */}
        </div>

        <ul className="sidebar-list-items" style={{ marginLeft: "10px" }}>
          <SidebarItem
            to="/dashboard"
            label="Plant Type"
            selected={selectedItem === "/dashboard"}
          />
          <SidebarItem
            to="/rooms"
            label="Rooms"
            selected={selectedItem === "/rooms"}
          />
          <SidebarItem
            to="/harvest"
            label="Harvest"
            selected={selectedItem === "/harvest"}
          />
          {/* <SidebarItem
            to="/strains"
            label="Photosynthesis"
            selected={selectedItem === "/strains"}
          /> */}
          {/* <SidebarItem
            to="/cure-rooms"
            label="Cure Rooms"
            selected={selectedItem === "/cure-rooms"}
          /> */}
        </ul>
      </div>
    </div>
  );
}

function SidebarItem({ to, label, selected }) {
  const navigate = useNavigate();
  return (
    <li
      className={`sidebar-list-item py-2 cursor-pointer ${selected ? "selected" : ""}`}
      onClick={() => navigate(to)}
    >
      <Link to={to} className="nav-link align-middle px-2 nav-item">
        <span
          className={`${"ms-1 px-1"} ${selected ? "sidebat-text" :''}`}
          style={{ color: selected ? "white" : "black" }}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
