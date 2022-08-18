
import React, { useEffect, useState } from "react";

import "./Login.css";
import image6 from "../../assets/image-6.png";
import InvestorPortal from "../investor/InvestorPortal";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";
import LoginForm from "./loginLogout/LoginForm"
import LogoutButton from "./loginLogout/LogoutButton";
import isVerified from "../../functions/isVerified";



const Login = () => {
  const [logged, setLogged] = useState(false);
  // const [message, setMessage] = useState("");
  // const [loginOrLogoff, setLoginOrLogoff] = useState(LoginForm)
  // const navigate = useNavigate();



  let logout = function () {
    localStorage.clear()
    setLogged(false)
  }

  useEffect ( () => {
    // console.log(`logged = ${logged}`)
  }, [logged])

  useEffect( () => {
    setLogged(isVerified())
  },  [])

  let renderComponents = function () {
    if (logged){
      return <LogoutButton logout = {logout}/>
    } else {
      return <LoginForm setLogged = {setLogged}/>
    }
  }



  useEffect(() => {

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    

    <Grid container className="loginGrid">
      <Grid container className="banner" xs={12}>
        <Grid item className="logBanner" xs={12}>
        <h2 className="logH2">INVESTOR LOGIN</h2>
        </Grid>
      </Grid>

      
      {renderComponents()}
      <ColorBlobs/>
    
    </Grid>
  );
};

export default Login;
