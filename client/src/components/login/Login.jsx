import React, { useState } from "react";
import "./Login.css";
import image6 from "../../assets/image-6.png";
import InvestorPortal from "../investor/InvestorPortal";
import { display } from "@mui/system";

const Login = () => {
  const [logged, setLogged] = useState(false);

  const checkLog = () => {
    if (logged === true) {
      return <InvestorPortal/>
  } else {
    return '<h1>"You did it wrong"</h1>'
  }}

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
        console.log(email, password, data)
        if (data.auth) {
          setLogged(true)
          let token = data.token;
          localStorage.setItem("token", token) 

        } else {
          setLogged(false)
        }
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <h1>Kiddo</h1>
      <h1>Login</h1>
      <div className="banner">
        <img src={image6} id="img1" alt="kids image" />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" placeholder="Enter your email" />
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
          />
          <button>Login</button>
        </form>
        <button>Register</button>
        <button>Admin Login</button>
      </div>
      {checkLog}
    </div>
  );
};

export default Login;
