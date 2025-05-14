import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Handle input change for search
  const handleChange = e => {
    setQuery(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (query) {
      // Navigate to Reports page with the search query
      navigate("/reports", { state: { query } });
    }
  };

  return (
    <div className="container-0">
      <div className="container-1">
        <h3>Hi, Jhone Lever</h3>
        <h5>Let's finish your task today!</h5>
      </div>

      <div className="right">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or status"
            value={query}
            onChange={handleChange}
          />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fa-solid fa-search"></i>
          </button>
        </div>

        <div className="container-2">
          <div className="icon-container">
            <i className="fa-regular fa-comment"></i>
          </div>
          <div className="icon-container">
            <i className="fa-regular fa-bell"></i>
          </div>
        </div>

        <div className="container-3">
          <div className="image-container">
            <img src="avatar2.jpeg" alt="User Avatar" />
          </div>

          <div className="name-container">
            <div className="container-4">
              <h5>Jhone Lever</h5>
              <div className="dropdown">
                <button className="dropbtn">
                  <i className="fa-solid fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <a href="#">Profile</a>
                  <a href="#">Settings</a>
                  <a href="#">Logout</a>
                </div>
              </div>
            </div>
            <h6>UI Designer</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
