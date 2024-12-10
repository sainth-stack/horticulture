/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import "./styles.scss";
// import userprofile from '../../assets/images/userprofile.png'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import avatar from '../../assets/svg/avatar.svg'
import { GoHome } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";

function NavbarV2() {
  const navigate = useNavigate()
  const [name, setName] = useState("Dashboard")
  const [selectedIcon, setSelectedIcon] = useState('settings')
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/login')
  }

  let location = useLocation();
  useEffect(() => {
    if (location.pathname == '/accounts') {
      setName("Accounts")
    } else if (location.pathname == '/layout') {
      setName("Layout")
    } else if (location.pathname == '/hardware') {
      setName("Hardware")
    }
    else if (location.pathname == '/software') {
      setName("Software")
    } else if (location.pathname == '/about') {
      setName("About")
    } else if (location.pathname == '/updates') {
      setName("Updates")
    }
  }, [location.pathname])
  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    navigate('/harvest')
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg  navbar-light bg-white shadow-sm sticky-top" style={{
        position: 'fixed',
        top: 0,
        left: 220,
        right: 0
      }}>
        <div class="collapse navbar-collapse" style={{ marginLeft: '0px' }} id="navbarNav">
          {/* <img
            src={Logo}
            style={{ width: '160px' }}
            id="logo_RL"
          /> */}
          <div style={{
            marginLeft: '10px',
            marginTop: '0px',
            padding: '12px',
            fontWeight: 700,
            fontSize: '23px'
          }}>
            {name}
          </div>
        </div>
        <div className="nav-item dropdown d-flex align-items-center mr-2 pr-5 me-4" style={{ color: '#333', backgroundColor: '#fff', padding: '5px', borderRadius: '8px', boxShadow: 'none' }}>
          <div style={{ cursor: 'pointer', backgroundColor: selectedIcon === 'home' ? '#007bff' : '#ffffff', borderRadius: '10%', padding: '10px', marginRight: '10px' }} onClick={() => handleIconClick('home')}>
            <GoHome size={30} style={{ color: selectedIcon === 'home' ? '#ffffff' : '#007bff' }} />
          </div>
          <div style={{ cursor: 'pointer', backgroundColor: selectedIcon === 'settings' ? '#007bff' : '#ffffff', borderRadius: '10%', padding: '10px' }} onClick={() => handleIconClick('settings')}>
            <IoMdSettings size={30} style={{ color: selectedIcon === 'settings' ? '#ffffff' : '#007bff' }} />
          </div>
        </div>
      </nav>
    </>

  );

}
export default NavbarV2;
