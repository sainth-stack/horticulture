import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './style.css'
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import SidebarV2 from "../components/SidebarV2";
import NavbarV2 from "../components/NavbarV2";
import { useMediaQuery } from "@mui/material";
export function AdminLayoutV2(props) {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("email")
    console.log(accessToken)
    return true
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div className="row p-0 m-0">
      <React.Fragment>
        {isAuthenticated() ? <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 m-0 bg-light">
          {/* Top Navbar */}
          {/* Main content */}
          <div className="d-flex justify-content-between" >

            <div className={""}>
              <SidebarV2 {...{isSidebarOpen, setIsSidebarOpen}} />
            </div>
            <div className="p-0 m-0 w-100 main-content2">
              <NavbarV2 {...{isSidebarOpen, setIsSidebarOpen}}/>
              <div style={{
                marginTop:'90px',
                marginLeft:isSmallScreen ? '' :'270px',
                height:'100vh'
              }}>
                <Outlet />
              </div>
            </div>
          </div>
        </div> : (
          <Navigate to="/" replace />
        )}
      </React.Fragment>
    </div>
  );
}
