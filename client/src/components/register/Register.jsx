
import React from "react";
import "./Register.css";
import image6 from "../../assets/image-6.png";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";


const Register = () => {
  return (

    <Grid container className="regContainer" xs={12}>
      <Grid container className="banner">
          <h1>Register With Kiddo To Join Our Mission!</h1>
          <Grid item className="imageOne" width="50%" xs={9}>
            <img src={image6} id="img7" alt="ads image" width="100%" />
          </Grid>
        </Grid>
      <form method="POST" action="http://localhost:8000/signup/submit">
        <Grid container className="regForm" md={12} xs={12}>
          <Grid container className="field" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              First Name
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
              />
            </Grid>
          </Grid>
          <Grid container className="field" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Last Name
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
              />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Company Name
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input
                type="text"
                name="business"
                placeholder="Enter company name"
              />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Email
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input type="text" name="email" placeholder="Enter your email" />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Country
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input type="text" placeholder="Enter your country" />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              State
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input type="text" placeholder="Enter your state" />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Address
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
              />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              ZIP
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input type="text" placeholder="Enter your zipcode" />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Password
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input
                type="text"
                name="password"
                placeholder="Enter your password"
              />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Re-Enter Password
            </Grid>
            <Grid item className="input" md={5} xs={10}>
              <input type="text" placeholder="Re-Enter your password" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="reg-btn" xs={9}>
        <div className="register">
           <button  className="register-btn">Register</button>
        </div>
        </Grid>
      </form>
      <ColorBlobs/>
    </Grid>
  );
};

export default Register;

