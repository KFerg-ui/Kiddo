import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from '../../assets/logo-white-transparent.png'
import isVerified from "../../functions/isVerified";
import { UserContext } from "../../App";
// const port = process.env.PORT || 8000;

const LogoutButton  = (props) => {
  const navigate= useNavigate()
  const setHasToken = useContext(UserContext)

  let logout = () => {
    localStorage.clear()
    setHasToken(false)
    props.closeMobileMenu()
    navigate("/")
  }

  return (
    <Link to="/" className = "nav-link" onClick = { logout }>LOGOUT</Link>
  )
}

  const LoginButton  = (props) => {
    // const [nav, setNav] = useState(false);
    // const navClick = () => setNav(!nav);
    // const closeMobileMenu = () => setNav(false);
    return (
      <Link to="/login" className="nav-link" onClick={props.closeMobileMenu}>LOGIN</Link>
    )
  }

const Navbar = (props) => {

  const [verified, setVerified] = useState("");
  let token = localStorage.getItem("token");
  const [nav, setNav] = useState(false);
  const navClick = () => setNav(!nav);
  const closeMobileMenu = () => setNav(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(props.hasToken)

    let rootURL;
    if (document.location.hostname.includes("localhost")){
      rootURL = `http://localhost:8000`
    } else {
      rootURL = `https://${document.location.hostname}`
    }

    fetch(`${rootURL}/customer-service`, {
      method: 'GET',
      headers: {
        "accesstoken": token,
        "search": "",
        "method": "business"
      } 
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.auth){
        setVerified(<Link to='/support' className="nav-link" onClick={closeMobileMenu}>ADMIN PORTAL</Link>)
        setHasToken(props.hasToken)
      }
      else{
        setVerified("");
      }
    })
    .catch((error)=>{
      console.error('Error:', error);
    });
  }, [props.hasToken, verified])


  let conditionalComponent = () => {
    
    if (hasToken){
      return (<LogoutButton closeMobileMenu = {closeMobileMenu}/>)
    } else {
      return (<LoginButton closeMobileMenu = {closeMobileMenu}/>)
    }

  }

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
            {conditionalComponent()}
            {/* <Link to="/login" className="nav-link" onClick={closeMobileMenu}>LOGIN</Link> */}
          </li>
          <li>
            {verified}
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
