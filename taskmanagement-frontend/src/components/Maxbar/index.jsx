import React from "react";
import { Outlet } from "react-router-dom";

import "./maxbar.css";

const MaxBar = () => {
  return (
    <div className="maxbar-container">
      <Outlet />
    </div>
  );
};

export default MaxBar;
