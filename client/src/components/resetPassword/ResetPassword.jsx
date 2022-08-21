import React from 'react'
import { useEffect } from 'react'
import './resetPassword.css'

function ResetPassword() {

    const [hasResetToken, setHasResetToken] = React.useState(false)
    const [alertText, setAlertText] = React.useState(false)
    const [token, setToken] = React.useState("")

    const verify = async (resetToken) => { 
        // console.log("checking verify")
          
          fetch('http://localhost:8000/verifyUser', {
            method: 'GET',
            headers: {
              "accesstoken": resetToken
            } 
          })
          .then((response) => response.json())
          .then((data) => {
            // console.log("Auth check: " + data.auth !== undefined)
            if(data.auth){
              setHasResetToken(true)
              console.log("good")
              
            }
            else{
              console.log("Bad Auth")
              setHasResetToken(false)
            }
          })
          .catch((error)=>{
            console.error('Error:', error);
            console.log("catch")
            
          });
        }

    useEffect(() => {

        const url = document.location.pathname
        // console.log(url)

        const urlSplit = url.split('/')
        console.log(urlSplit)
        const resetToken = urlSplit[urlSplit.length - 1]

        console.log("token: ", resetToken)

        verify(resetToken)

        console.log(hasResetToken)

        
    }, [])

 


    const handleSubmit = async (e) => {
        e.preventDefault()

        const path = document.location.pathname
        // console.log(url)

        const urlSplit = path.split('/')
        
        const token = urlSplit[urlSplit.length - 1]

        console.log(token)

        const pass1 = e.target.elements.pass1.value
        const pass2 = e.target.elements.pass2.value

        // console.log(pass1)

        if (pass1 !== pass2) {
            setAlertText("Passwords must match")
        } else {

            
            //Here we must send a request to the server to update the password
            fetch('http://localhost:8000/password/submit-new', {
              method: 'POST',
              body: JSON.stringify({
                "newPass" : pass1
              }),
              headers: {
                "accesstoken": token,
                "Content-type": "application/json; charset=UTF-8",
                // "newPass" : pass1
              },
            })
            .then((response) => response.json())
            .then((data) => {
              console.log("data:" + data)
              // console.log("Auth check: " + data.auth !== undefined)
              setAlertText(data.message)
            })
            .catch((error)=>{
              console.error('Error:', error);
              // console.log(data)
              
            });

        }
        
    }

    if (hasResetToken){

        return (
        <div>
            <form id = "passwordResetForm" onSubmit = {handleSubmit}>
                
                <label htmlFor = "pass1">Enter new password:</label>
                    
                <input type = "password" name = "pass1"></input>
                <label htmlFor = "pass2">Re-enter password:</label>
    
                <input type = "password" name = "pass2"></input>
                <button type = "submit">Submit</button>
                <h4>{alertText}</h4>
            </form>
        </div>
         )
    } else {
        return (<h1>Bad Token</h1>)
    }

     
}

export default ResetPassword