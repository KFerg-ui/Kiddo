
import React, { useEffect, useState } from "react";

import "./Login.css";
import image6 from "../../assets/image-6.png";
// import InvestorPortal from "../investor/InvestorPortal";
// import { Link, useNavigate } from "react-router-dom";
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
        {/* <Grid item className="imageOne" width="50%" xs={9}>
          <img src={image6} id="img7" alt="ads image" width="100%" />
        </Grid> */}
      </Grid>
      

      
      {conditionalComponent()}
      <ColorBlobs/>
    </Grid>
    
    //   <Grid item className="login-prompt" md={12} xs={12}>
    //     Login To Kiddo
    //   </Grid>

    //   <Grid 
    //     container 
    //     className="form-container" 
    //     xs={12} 
    //     justify-content="space-evenly"
    //     sx={{ flexDirection: { md: "row" } }}>
    //     <form onSubmit={handleSubmit}>
    //       <Grid container className="label" xs={12}>Email </Grid>
    //         <Grid item className="label" xs={12}>
         
    //       <input type="text" name="email"/>
    //       </Grid>
    //       <Grid item className="label" md={6} xs={12}>Password</Grid>
    //       <Grid container className="password" xs={12}>
    //       <input
    //         type="text"
    //         name="password"
    //       />
    //       </Grid>
         
          
    //       <Grid item className="logButton" xs={12}>
    //       <button id= "login-btn">Login</button>
    //       <p>{message}</p>
    //       </Grid>
    //     </form>
    //   </Grid>
    //   <Grid className="regContainer" xs={12}>
    //     <Link to="/register"><button id="reg-btn">Register</button></Link>
    //   </Grid>
    //   <Grid className="adminContainer" xs={12}>
    //   </Grid>


    //   <ColorBlobs/>
    // </Grid>

  );
};

export default Login;
