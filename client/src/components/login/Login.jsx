import React from "react";
import "./Login.css";
import image6 from "../../assets/image-6.png";
const Login = () => {
  return (
    <div className="login">
      <h1>Kiddo</h1>
      <h1>Login</h1>
      <div className="banner">
        <img src={image6} id="img1" alt="kids image" />
      </div>

      <div className="form-container">
        <form method="post" action="http://localhost:8000/signin">
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
    </div>
  );
};

export default Login;
