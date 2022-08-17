import React from 'react'

function LogoutButton() {

  

  return (
    <button onClick = {localStorage.clear()}>Sign Out</button>
  )
}

export default LogoutButton