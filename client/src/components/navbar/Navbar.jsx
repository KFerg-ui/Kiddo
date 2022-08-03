import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navClick = () => setNav(!nav);
  return (
    <div className="navbar">
      <div className="container">
        <ul className={nav ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <div className="bars-container">
          <div className="bars-icon" onClick={navClick}>
            <FaBars className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
