import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { FaBars, FaTimes } from "react-icons/fa";

export default function SidebarV2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
      {/* Toggle button visible on small screens */}
      <div className="menu-icon-container_v3 d-block d-lg-none">
        <button
          className="btn btn-light mx-3 icon bg-light"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <FaTimes style={{ fontSize: "1.5rem" }} />
          ) : (
            <FaBars style={{ fontSize: "1.5rem" }} />
          )}
        </button>
      </div>

      {/* Sidebar container */}
      <div
        className={`shadow sidebar-scroll sticky-top zindex99 bg-white ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        style={{
          overflow: "auto",
          width: isSmallScreen ? "50%" : "220px",
          height: "100vh",
          transition: "transform 0.3s ease-in-out",
          position: "fixed",
          left: 0,
          top: 0,
          transform:
            isSidebarOpen || !isSmallScreen
              ? "translateX(0)"
              : "translateX(-100%)",
        }}
      >
        <div style={{ marginTop: "5px", marginBottom: "50px" }}>
          {/* Placeholder for logo */}
        </div>

        <ul
          className="sidebar-list-items"
          id="menu"
          style={{ paddingLeft: "10px", listStyle: "none", padding: 0 }}
        >
          <SidebarItem
            to="/accounts"
            label="Accounts"
            selected={selectedItem === "/accounts"}
          />
          <SidebarItem
            to="/layout"
            label="Layout"
            selected={selectedItem === "/layout"}
          />
          <SidebarItem
            to="/hardware"
            label="Hardware"
            selected={selectedItem === "/hardware"}
          />
          <SidebarItem
            to="/software"
            label="Software"
            selected={selectedItem === "/software"}
          />
          <SidebarItem
            to="/updates"
            label="About Us"
            selected={selectedItem === "/updates"}
          />
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
          className="ms-1 px-1"
          style={{ color: selected ? "white" : "black" }}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
