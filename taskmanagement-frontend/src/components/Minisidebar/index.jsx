import React from "react";
import { NavLink } from "react-router-dom";
import "./minisidebar.css";
import Calendar from "../Calender";

const MiniSidebar = () => {
  return (
    <div className="dashboard-container">
      <div className="minisidebar">
        <h1>Taskify</h1>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `ia ${isActive ? "active" : ""}`}
            >
              <i className="fa-solid fa-table-columns"></i> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/track"
              className={({ isActive }) => `ia ${isActive ? "active" : ""}`}
            >
              <i className="fa-solid fa-list-check"></i> Track
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => `ia ${isActive ? "active" : ""}`}
            >
              <i className="fa-solid fa-chart-column"></i> Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) => `ia ${isActive ? "active" : ""}`}
            >
              <i className="fa-solid fa-file-lines"></i> Reports
            </NavLink>
          </li>
        </ul>
      </div>
      <Calendar />
    </div>
  );
};

export default MiniSidebar;
