import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './style.css'
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import SidebarV3 from "../components/SidebarV3";
import NavbarV3 from "../components/NavbarV3";
export function AdminLayoutV3(props) {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("token")
    return true
  }
  return (
    <div className="row p-0 m-0">
      <React.Fragment>
        {isAuthenticated() ? <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 m-0 bg-light">
          {/* Top Navbar */}
          {/* Main content */}
          <div className="d-flex justify-content-between" >

            <div className={""}>
              <SidebarV3 />
            </div>
            <div className="p-0 m-0 w-100 main-content2">
              <NavbarV3 />
              <div style={{
                marginTop:'90px',
                height:'100vh'
              }}>
                <Outlet />
              </div>
            </div>
          </div>
        </div> : (
          <Navigate to="/login" replace />
        )}
      </React.Fragment>
    </div>
  );
}
