import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from '../../assets/logo-white-transparent.png'
import isVerified from "../../functions/isVerified";

const LogoutButton  = () => {
  return (
    <button onClick = { () => {localStorage.clear()} }>Sign Out</button>
  )
}

const LoginButton  = () => {
  const [nav, setNav] = useState(false);
  const navClick = () => setNav(!nav);
  const closeMobileMenu = () => setNav(false);
  return (
    <Link to="/login" className="nav-link" onClick={closeMobileMenu}>LOGIN</Link>
  )
}


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navClick = () => setNav(!nav);
  const closeMobileMenu = () => setNav(false);
  const [count, setCount] = useState(-1)
  const [hasToken, setHasToken] = useState(false);

  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [loginOrLogout, setLoginOrLogout] = useState(LoginButton)

  // let checkVerification = async function () {
  //   let verified = await isVerified();
  //   setIsLoggedIn(verified)
  // }

  // useEffect(() => {
  //   checkVerification()
  // }, [count])

  useEffect(() =>{
    let kill = setTimeout(() => {
      setCount(count + 1)
      // setHasToken(true)
      console.log("Tick")
    }, 100);
    // return () => clearTimeout(kill);
  },[]);




  // useEffect(() => {
  //   if (isLoggedIn){
  //     // setLoginOrLogout(LogoutButton)
  //   } else {
  //     // setLoginOrLogout(LoginButton)
  //   }
  // }, [isLoggedIn])

  let conditionalComponent = () => {
    console.log("Running? ")

    if (localStorage.getItem("token")){
      return (<LogoutButton/>)
    } else {
      return (<LoginButton/>)
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
