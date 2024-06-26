import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import { MdHome, MdBusiness, MdBusinessCenter, MdPeople, MdSchedule, MdWork, MdStorage, MdOutlineClose,MdOutlineSettings, MdOutlineLogout } from 'react-icons/md';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate('');
  
  const handleLogout = () => {
    navigate('/')
    localStorage.removeItem('selectedDepartment', departmentId);
  }

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => { 
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleMenuClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
     
<div className="sidebar-top">
  <div className="sidebar-brand">
    <div className="CT-motors"></div>
  </div>
  <button className="sidebar-close-btn" onClick={closeSidebar}>
    <MdOutlineClose size={24} />
  </button>
</div>
<div className="sidebar-body">
  <div className="sidebar-menu">
    <ul className="menu-list">
      <li className="menu-item">
      <Link to="/dashboard" className={`menu-link ${activeLink === "/dashboard" ? "active" : ""}`} onClick={() => handleMenuClick("/dashboard")}>
          <span className="menu-link-icon">
            <MdHome size={18} />
          </span>
          <span className="menu-link-text">Dashboard</span>
        </Link>
      </li>
      <li className="menu-item">
      <Link to="/society" className={`menu-link ${activeLink === "/society" ? "active" : ""}`} onClick={() => handleMenuClick("/society")}>
          <span className="menu-link-icon">
            <MdBusiness size={20} />
          </span>
          <span className="menu-link-text">Society</span>
        </Link>
      </li>
      <li className="menu-item">
      <Link to="/department" className={`menu-link ${activeLink === "/department" ? "active" : ""}`} onClick={() => handleMenuClick("/department")}>
          <span className="menu-link-icon">
            <MdBusinessCenter size={20} />
          </span>
          <span className="menu-link-text">Department</span>
        </Link>
      </li>
      <li className="menu-item">
      <Link to="/user" className={`menu-link ${activeLink === "/user" ? "active" : ""}`} onClick={() => handleMenuClick("/user")}>
          <span className="menu-link-icon">
            <MdPeople size={18} />
          </span>
          <span className="menu-link-text">Users</span>
        </Link>
      </li>
      <li className="menu-item">
      <Link to="/workhour" className={`menu-link ${activeLink === "/workhour" ? "active" : ""}`} onClick={() => handleMenuClick("/workhour")}>
          <span className="menu-link-icon">
            <MdSchedule size={20} />
          </span>
          <span className="menu-link-text">Workhour</span>
        </Link>
      </li>
      <li className="menu-item">
      <Link to="/employees" className={`menu-link ${activeLink === "/employees" ? "active" : ""}`} onClick={() => handleMenuClick("/employees")}>
          <span className="menu-link-icon">
            <MdWork size={20} />
          </span>
          <span className="menu-link-text">Employees</span>
        </Link>
      </li>
      <li className="menu-item">
      <Link to="/materials" className={`menu-link ${activeLink === "/Materials" ? "active" : ""}`} onClick={() => handleMenuClick("/Materials")}>
          <span className="menu-link-icon">
            <MdStorage size={18} />
          </span>
          <span className="menu-link-text">Materials</span>
        </Link>
      </li>
      <li className="menu-item">
      <Link to="/Attendance" className={`menu-link ${activeLink === "/Attendance" ? "active" : ""}`} onClick={() => handleMenuClick("/Attendance")}>
          <span className="menu-link-icon">
            <FontAwesomeIcon icon={faClock} size={18} />
          </span>
          <span className="menu-link-text">Attendance</span>
        </Link>
      </li>
    </ul>
  </div>
        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/settings" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li onClick={handleLogout}  className="menu-item">
              <Link className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
