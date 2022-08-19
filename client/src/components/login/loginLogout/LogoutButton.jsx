import React from 'react'

function LogoutButton() {

  

  return (
    
    <div className="signOutWrap">
      <button className="signOutBtn" onClick = {localStorage.clear()}>Sign Out</button>
    </div>

  )
}

export default LogoutButton