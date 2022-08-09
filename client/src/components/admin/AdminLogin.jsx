import './AdminLogin.css'
import React, { useState } from "react";
import InvestorPortal from "../investor/InvestorPortal";
import { Link } from "react-router-dom";
import { display } from "@mui/system";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";

const AdminLogin = () => {
  const [logged, setLogged] = useState(false);
  const [message, setMessage] = useState("");

  const checkLog = () => {
    if (logged === true) {
      return <InvestorPortal />;
    } else {
      return '<h1>"You did it wrong"</h1>';
    }
  };

  const handleSubmit = async (e) => {
    let email = e.target[0].value;
    let password = e.target[1].value;
    console.log(e);

    e.preventDefault();
    fetch("http://localhost:8000/signin", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),

      //* DIVE PLS
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(email, password, data);
        if (data.auth) {
          setLogged(true);
          let token = data.token;
          localStorage.setItem("token", token) 
        } else {
          setLogged(false)
          setMessage(data.message)
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container className="loginGrid">
      <Grid item className="login-prompt" md={12} xs={12}>
        Admin Login
      </Grid>

      <Grid 
        container 
        className="form-container" 
        xs={12} 
        justify-content="space-evenly"
        sx={{ flexDirection: { md: "row" } }}>
        <form onSubmit={handleSubmit}>
          <Grid container className="label" xs={12}>Email </Grid>
            <Grid item className="label" md={6} xs={12}>
         
          <input type="text" name="email" />
          </Grid>
          <Grid item className="label" md={6} xs={12}>Password</Grid>
          <Grid container className="password" xs={12}>
          <input
            type="text"
            name="password"
          />
          </Grid>
         
          
          <Grid item className="logButton" xs={12}>
          <button id= "login-btn">Login</button>
          <p>{message}</p>
          </Grid>
        </form>
      </Grid>

      {checkLog}
      <ColorBlobs/>
    </Grid>
  );
};
export default AdminLogin