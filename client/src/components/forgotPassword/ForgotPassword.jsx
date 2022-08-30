import React from 'react'
import { Grid } from "@mui/material";
import { Link } from "react-router-dom"
const port = process.env.PORT || 8000;
// import UserFront from "@userfront/core"



function ForgotPassword() {

    const [message, setMessage] = React.useState("");

    const handleSubmit = async (e) => {
        //this is a stub
        e.preventDefault()

        

        const userEmail = e.target[0].value
        

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                email: userEmail
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }

        let rootURL;
        if (document.location.hostname.includes("localhost")){
          rootURL = `http://localhost:8000/`
        } else {
          rootURL = `https://${document.location.hostname}`
        }

        
        try {

            fetch(`${rootURL}/password/forgot`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setMessage(data.message)
                })
            
        } catch (err) {
            console.log(err)
        }

    }

  return (
    <Grid container className="loginForm">

      <Grid
        container
        className="form-container"
        xs={12}
        justify-content="space-evenly"
        sx={{ flexDirection: { md: "row" } }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container className="label" xs={12}>
            Enter the email address associated with your account
          </Grid>
          <Grid item className="label" xs={12}>
            <input type="text" name="email" placeholder='your@email.com'/>
          </Grid>


          <Grid item className="logButton" xs={12}>
            <button id="login-btn">Submit</button>
            <p>{message}</p>
          </Grid>
        </form>
      </Grid>


    </Grid>
  )
}

export default ForgotPassword