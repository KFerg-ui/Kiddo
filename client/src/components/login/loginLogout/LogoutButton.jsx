import React from 'react'

function LogoutButton(props) {



  return (
    <button onClick = {props.logout()}>LogoutButton</button>
  )
}

export default LogoutButton