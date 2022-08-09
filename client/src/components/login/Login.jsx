import React, { useState } from "react";
import "./Login.css";
import image6 from "../../assets/image-6.png";
import InvestorPortal from "../investor/InvestorPortal";
import { Link } from "react-router-dom";
import { display } from "@mui/system";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";

const Login = () => {
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
      <Grid container className="banner" xs={12}>
        <Grid item className="imageOne" width="50%" xs={9}>
          <img src={image6} id="img7" alt="ads image" width="100%" />
        </Grid>
      </Grid>
      <Grid item className="login-prompt" md={12} xs={12}>
        Login To Kiddo Here
      </Grid>

      <Grid 
        container 
        className="form-container" 
        xs={12} 
        justify-content="space-evenly"
        sx={{ flexDirection: { md: "row" } }}>
        <form onSubmit={handleSubmit}>
          <Grid container className="email" xs={12}>
          <label className="eText">Email</label>
          <input type="text" name="email" placeholder="Enter your email" />
          </Grid>
          <Grid container className="password" xs={12}>
          <label className="pText">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
          />
          </Grid>
          <Grid item className="logButton" xs={12}>
          <button>Login</button>
          <p>{message}</p>
          </Grid>
        </form>
      </Grid>
      <Grid className="regContainer" xs={12}>
        <Link to="/register"><button>Register</button></Link>
      </Grid>
      <Grid className="adminContainer" xs={12}>
        <button>Admin Login</button>
      </Grid>

      {checkLog}
      <ColorBlobs/>
    </Grid>
  );
};

export default Login;
