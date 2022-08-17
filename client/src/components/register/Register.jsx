
import React, { useState, useEffect } from "react";
import "./Register.css";
import image6 from "../../assets/image-8.png";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  // const { register, handleSubmit } = useForm();
  const navigate= useNavigate()
  const [serverMessage, setServerMessage] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(e);

    let firstName = e.target.elements.firstName.value
    let lastName = e.target.elements.lastName.value
    let email = e.target.elements.email.value
    let business = e.target.elements.business.value
    let password = e.target.elements.password.value
    let passwordConfirm = e.target.elements.passwordConfirm.value

    fetch("http://localhost:8000/signup/submit", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        business,
        password,
        passwordConfirm
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        // console.log("response: ", response)
        return response.json()
      })
      //we will have to json() response then:
      .then((responseData) => {
        console.log("data: ", responseData)
        //if the response has a "success" code, we redirect to /login
        if (responseData.status === 200){
          navigate(`/login`)

        } else {
          setServerMessage(responseData.message)
        }
        //else we setMessage(res.message)

      })
    
    // fetch("http://localhost:8000/signin", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),

    //   //* DIVE PLS
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(email, password, data);
    //     if (data.auth) {
    //       props.setLogged(true);
    //       let token = data.token;
    //       localStorage.setItem("token", token) 

    //       navigate(`/investors`)

    //     } else {
    //       props.setLogged(false)
    //       setMessage(data.message)
    //     }
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));
  };

  {/* <form method="POST" action="http://localhost:8000/signup/submit"> */}

  useEffect(() => {

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  
  return (

    <Grid container className="regContainer" xs={12}>
      <Grid container className="banner">
          <h1 className="regPrompt">REGISTER TO JOIN OUR MISSION</h1>
          <Grid item className="regImg" width="50%" xs={9}>
            <img src={image6} id="img7" alt="ads image" width="100%" />
          </Grid>
        </Grid>
           <p>{serverMessage}</p>
          <form onSubmit = {handleSubmit}>
        <Grid container className="regForm" md={12} xs={12}>
          <Grid container className="field" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              First Name
            </Grid>
            <Grid md={5} xs={10}>
              <input
              item className="input"
                type="text"
                name="firstName"
              />
            </Grid>
          </Grid>
          <Grid container className="field" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Last Name
            </Grid>
            <Grid item md={5} xs={10}>
              <input className="input"
                type="text"
                name="lastName"
              />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Company Name
            </Grid>
            <Grid item md={5} xs={10}>
              <input
               className="input"
                type="text"
                name="business"
              />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Email
            </Grid>
            <Grid item md={5} xs={10}>
              <input  className="input" type="text" name="email" />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Country
            </Grid>
            <Grid item md={5} xs={10}>
              <input className="input" type="text"/>
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              State
            </Grid>
            <Grid item md={5} xs={10}>
              <input 
              className="input"
              type="text" />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Address
            </Grid>
            <Grid item md={5} xs={10}>
              <input
              className="input" 
                type="text"
                name="address"
              />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              ZIP
            </Grid>
            <Grid item  md={5} xs={10}>
              <input 
              className="input"
              type="text" />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Password
            </Grid>
            <Grid item md={5} xs={10}>
              <input
              className="input" 
                type="password"
                name="password"/>
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Re-Enter Password
            </Grid>
            <Grid item md={5} xs={10}>
              <input className="input" type="password" name="passwordConfirm"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="reg-btn" xs={12}>
        <div className="register">
           <button className="register-btn">Register</button>
        </div>
        </Grid>
      </form>
      <ColorBlobs/>
    </Grid>
  );
};

export default Register;

