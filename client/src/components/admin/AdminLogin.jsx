import React from 'react'
import './AdminLogin.css'
const AdminLogin = () => {
  return (
    <div className='admin-login'>
    <h1>Admin</h1>
   <h1>Login</h1>


  <div className='form-container'>
  <form>
    <label>Email</label>
    <input type="text" placeholder='Enter your email'/>

  <label>Password</label>
    <input type="text" placeholder='Enter your password'/>
    </form>
<button>Login</button>
  </div>
  </div>
  )
}

export default AdminLogin