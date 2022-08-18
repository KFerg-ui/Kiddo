import React, { useEffect, useState } from "react";
import "./Login.css";
import image6 from "../../assets/image-6.png";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";
import LoginForm from "./loginLogout/LoginForm"
import LogoutButton from "./loginLogout/LogoutButton";
import isVerified from "../../functions/isVerified";

const Login = () => {

const [logged, setLogged] = useState(false);

  let logout = function () {
    localStorage.clear()
    setLogged(false)
  }

  useEffect ( () => {
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

  let conditionalComponent = () => {
    if (localStorage.getItem("token")){
      return (<LogoutButton/>)
    } else {
      return (<LoginForm/>)
    }
  }

return (
    <Grid container className="loginGrid">
      <Grid container className="banner" xs={12}>
        <Grid item className="logBanner" xs={12}>
        <h2 className="logH2">INVESTOR LOGIN</h2>
        </Grid>
      </Grid>
      {conditionalComponent()}
      <ColorBlobs/>
    </Grid>
  );
};

export default Login;
