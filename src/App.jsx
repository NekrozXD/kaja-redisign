import React, { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import { DepartementScreen } from "./screens/departement/departement";
import { SocietyScreen } from "./screens/Society/SocietyScreen";
import { UserScreen } from "./screens/user/UserScreen";
import { WorkhourScreen } from "./screens/workhour/WorkhourScreen";
import { EmployeeScreen } from "./screens/employee/EmployeeScreen";
import { MaterialScreen } from "./screens/material/MaterialScreen";
import EmployeeFilter from "./components/employee/employeefilter";
import Login from "./components/Login/Login";
import EmployeeDetails from "./components/employee/employeeDetail";
import SettingsPage from "./components/settings/Settings";
import AttendanceComponent from "./components/dateEssai/AttendanceComponent";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/department" element={<DepartementScreen />} />
            <Route path="/society" element={<SocietyScreen />} />
            <Route path="/user" element={<UserScreen />} />
            <Route path="/workhour" element={<WorkhourScreen />} />
            <Route path="/employees" element={<EmployeeScreen />} />
            <Route path="/materials" element={<MaterialScreen />} />
            <Route path="/employeeFilter" element={<EmployeeFilter />} />
            <Route path="/employee-details" element={<EmployeeDetails />} />
            <Route path="/settings" element={<SettingsPage />} /> {/* Add this line */}
            <Route path="/Attendance" element={<AttendanceComponent />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
            alt="Theme Toggle"
          />
        </button>
      </Router>
    </>
  );
}

export default App;
