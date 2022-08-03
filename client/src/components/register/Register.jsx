import React from 'react'
import './Register.css'
const Register = () => {
  return (

  

    <div className='form-container'>
    <form>
        <div className='register'>
    <h1>Kiddo</h1>
   <h1>Register</h1>
<h1>Join Our Mission!</h1>
</div>
     
      <label>First Name</label>
      
      <input type="text" placeholder='Enter your first name'/>
      <label>Last Name</label>
      <input type="text" placeholder='Enter your last name'/>
      <label>Company Name</label>
      <input type="text" placeholder='Enter company name'/>
      <label>Email</label>
      <input type="text" placeholder='Enter your email'/>
      <label>Country</label>
      <input type="text" placeholder='Enter your country'/>
      <label>State</label>
      <input type="text" placeholder='Enter your state'/>
      <label>Address</label>
      <input type="text" placeholder='Enter your address'/>
      <label>Zipcode:</label>
      <input type="text" placeholder='Enter your zipcode'/>
    <label>Password</label>
      <input type="text" placeholder='Enter your password'/>
      <label>Re-Enter Password</label>
      <input type="text" placeholder='Re-Enter your password'/>

      <button>Register</button>
      </form>

      </div>
      
  )
}

export default Register