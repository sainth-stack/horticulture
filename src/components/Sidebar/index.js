import React, { useState } from "react";
import "./styles.css";
import { LuFileClock } from "react-icons/lu";
import { HiUserGroup } from "react-icons/hi";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { FaFileContract } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="d-block d-md-none">
        <button
          className="btn btn-primary position-fixed top-0 end-0 m-2"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      {/* Sidebar Container */}
      <div
        className={`shadow sidebar-scroll sticky-top zindex99 ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        } d-md-block`}
        style={{ overflow: "auto", width: "220px" }}
      >
        <ul className="sidebar-list-items" id="menu">
          <li className="sidebar-list-item pt-4 cursor-pointer">
            <Link
              to="/resource-management"
              className="nav-link align-middle px-2 nav-item"
            >
              <HiUserGroup size={20} />
              <span className="ms-1 d-none d-sm-inline link-text text-black px-1">
                Resource Management
              </span>
            </Link>
          </li>
          <li className="sidebar-list-item pt-4 cursor-pointer">
            <Link
              to="/timesheet"
              className="nav-link align-middle px-2 nav-item"
            >
              <LuFileClock size={20} />
              <span className="ms-1 d-none d-sm-inline link-text px-1">
                TimeSheet
              </span>
            </Link>
          </li>
          <li className="sidebar-list-item pt-4 cursor-pointer">
            <Link
              to="/projects"
              className="nav-link align-middle px-2 nav-item"
            >
              <VscFileSymlinkDirectory size={20} />
              <span className="ms-1 d-none d-sm-inline link-text px-1">
                Projects
              </span>
            </Link>
          </li>
          <li className="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/reports" className="nav-link align-middle px-2 nav-item">
              <FaFileContract size={20} />
              <span className="ms-1 d-none d-sm-inline link-text px-1">
                Reports
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
