import React, { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";

const Admin = () => {
  const [logged, setLogged] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    let email = e.target[0].value;
    let password = e.target[1].value;

    e.preventDefault();
    fetch("http://localhost:8000/signin/admin", {
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
        if (data.auth) {
          setLogged(true);
          let token = data.token;
          localStorage.setItem("token", token);
          navigate(`/support`)
        } else {
          setLogged(false);
          setMessage(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container className="loginGrid">
      <Grid container className="banner" xs={12}>
        <Grid item width="50%" xs={12} className="adLogContainer">
          {" "}{/* center later */}
          <h1 className="adLogTitle">ADMINISTRATOR LOGIN</h1>
        </Grid>
      </Grid>
      <Grid
        container
        className="form-container"
        xs={12}
        justify-content="space-evenly"
        sx={{ flexDirection: { md: "row" } }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container className="label" xs={12}>
            Email{" "}
          </Grid>
          <Grid item className="label" xs={12}>
            <input type="text" name="email"/>
          </Grid>
          <Grid item className="label" xs={12}>
            Password
          </Grid>
          <Grid container className="password" xs={12}>
            <input
              type="password"
              name="password"
              />
          </Grid>
          <Grid item className="logButton" xs={12}>
            <button className="adLogButton">Login</button>
            <p>{message}</p>
          </Grid>
        </form>
      </Grid>

      <ColorBlobs />
    </Grid>
  );
};

export default Admin;
