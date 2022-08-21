
import React, { useState, useEffect } from "react";
import "./Register.css";
import image6 from "../../assets/image-8.png";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const changeFirst = event => {
    let result = event.target.value.replace(/[^a-z,.'-]/gi, '');
    setFirstName(result);
  };

  const changeLast = event => {
    let result = event.target.value.replace(/[^a-z,.'-]/gi, '');
    setLastName(result);
  };


  function removeExtra(string){
    return(string.replace(/\s+/g, ' ').trim())
  }
  // const { register, handleSubmit } = useForm();
  const navigate= useNavigate()
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [serverMessage, setServerMessage] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(e);

    let firstName = removeExtra(e.target.elements.firstName.value)
    let lastName = removeExtra(e.target.elements.lastName.value)
    let email = removeExtra(e.target.elements.email.value)
    let business = removeExtra(e.target.elements.business.value)
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
    <Grid container className="registerPage" xs={12}>
      <Grid container className="banner">
          <Grid item className="regImg" width="50%" xs={9}>
          <h1 className="regPrompt">REGISTER TO JOIN OUR MISSION</h1>
            <img src={image6} id="img7" alt="ads image" width="100%" />
          </Grid>
        </Grid>
      <Grid container className="regContainer" xs={12}>
           <p>{serverMessage}</p>
          <form onSubmit = {handleSubmit}>
        <Grid container className="regForm" md={12} xs={12}>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              First Name
            </Grid>
            <Grid md={5} xs={10}>
            <input
              item className="input"
                onChange ={changeFirst}
                value = {firstName}
                type="text"
                name="firstName"
                required
              />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Last Name
            </Grid>
            <Grid item md={5} xs={10}>
            <input className="input"
                onChange = {changeLast}
                value = {lastName}
                type="text"
                name="lastName"
                required
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
              Phone
            </Grid>
            <Grid item md={5} xs={10}>
              <input  className="input" type="text" name="phone" />
            </Grid>
          </Grid>
          <Grid container className="first" md={6} xs={12}>
            <Grid item className="label" md={5} xs={10}>
              Preferred Contact
            </Grid>
            <Grid item md={5} xs={10}>
              {/* <input className="input" type="text"/> */}
              <select className="inputC" name="country">
    <option>select</option>
    <option value="call">Call</option>
    <option value="text">Text</option>
    <option value="EM">Email</option>
</select>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="passwords" md={12} xs={12}>
          <Grid container className="first" xs={12}>
            <Grid item className="labelPass" md={12} xs={10}>
              Password
            </Grid>
            <Grid item md={12} xs={10}>
              <input
              className="input" 
                type="password"
                name="password"/>
            </Grid>
          </Grid>
          <Grid container className="first" xs={12}>
            <Grid item className="labelPass" md={12} xs={10}>
              Re-Enter Password
            </Grid>
            <Grid item md={12} xs={10}>
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
      </Grid>
  );
};

export default Register;

