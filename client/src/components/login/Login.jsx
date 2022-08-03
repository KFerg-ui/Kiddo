import React from 'react'
import './Login.css'
import image6 from '../../assets/image-6.png'
const Login = () => {
  return (
    <div className='login'>
      <h1>Kiddo</h1>
     <h1>Login</h1>
<div className='banner'>
<img src={image6} id="img1" alt="kids image" />

</div>


    <div className='form-container'>
    <form>
      <label>Email</label>
      <input type="text" placeholder='Enter your email'/>
  
    <label>Password</label>
      <input type="text" placeholder='Enter your password'/>
      </form>
<button>Login</button>
<button>Register</button>
<button>Admin Login</button>
    </div>
    </div>
  )
}

export default Login