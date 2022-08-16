import React from 'react'

function LogoutButton(props) {



  return (
    <div className="signOutWrap">
    <button className="signOutBtn" onClick = {props.logout}>Sign Out</button>
    </div>
  )
}

export default LogoutButton