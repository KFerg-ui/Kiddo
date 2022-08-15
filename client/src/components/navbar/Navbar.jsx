import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from '../../assets/logo-white-transparent.png'


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navClick = () => setNav(!nav);
  const closeMobileMenu = () => setNav(false);


  return (
    <div className="navbar">
      <div className="container">
        <ul className={nav ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link to="/" className="nav-link" onClick={closeMobileMenu}>HOME</Link>
          </li>
          <li>
            <Link to="/register" className="nav-link" onClick={closeMobileMenu}>REGISTER</Link>
          </li>
          <li>
            <Link to="/login" className="nav-link" onClick={closeMobileMenu}>LOGIN</Link>
          </li>
        </ul>
      
        <div id="bars-container">
          <div className="bars-icon" onClick={navClick}>
            <FaBars className="icon" />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Navbar;
