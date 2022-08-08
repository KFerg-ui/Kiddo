import React , { useState , useEffect } from "react";
import "./InvestorPortal.css";
import image8 from "../../assets/image-8.png";
import image9 from "../../assets/image-9.png";
import contactUs from "../../assets/contactUs.png";
import standingDesk from "../../assets/standingDesk.png";
import { Grid } from "@mui/material";

const InvestorPortal = () => { 
  const [verification, setVerification] = useState(false);
  const [count, setCount] = useState(-1);
  let token = localStorage.getItem("token");

  function verify(){
    fetch('http://localhost:8000/verifyUser', {
      method: 'GET',
      headers: {
        "accesstoken": token
      } 
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.auth){
        setVerification(true);
      }
      else{
        setVerification(false);
      }
    })
    .catch((error)=>{
      console.error('Error:', error);
    });
  }
  useEffect(() =>{
    setTimeout(() => {
      setCount(count + 1)
    }, 5000);
    verify();
  },[count]);

  if(verification){
    return (
      <div>
        <div>
          {" "}
          <Grid item xs={11} className="welcomeTitle" direction="row">

          <h1>Welcome (Investment Company/Name)</h1>
          </Grid>
        </div>

        <Grid container className="gridWrapContainer" direction="row">
          <Grid item xs={11} className="picWrap pic8Wrap" direction="row">
            <Grid item xs={5} className="bulletPhrases">
              Kiddo information <br/>
              Market Research <br/>            
              Business model 
            </Grid> 
            <Grid item xs={5} className="picContainer">
              <img className='image8' src={image8} id="img8" alt="4 cartoon kids at a table" /></Grid>
          </Grid>
        </Grid>
        
        <Grid container className="gridWrapContainer" direction="row">
          <Grid item xs={11} className="picWrap pic9Wrap" direction="row">
            <Grid item xs={5} className="picContainer">
              <img className="image9" src={image9} id="img9" alt="cartoon investor at computer " /></Grid> 
            <Grid item xs={5} className="bulletPhrases">
              Kiddo team            
            </Grid>
          </Grid>
        </Grid>

        <Grid container className="gridWrapContainer" direction="column">
          <Grid item xs={11} className="picWrap" direction="row">
          <h2>Company Statistics</h2>
          <Grid item xs={5} className="picContainer">
              <img className="standingDesk" src={standingDesk} id="standingDesk" alt="cartoon investor standing at computer " /></Grid>     
          </Grid>
        </Grid>

        <Grid container className="formWrapContainer" direction="row">
        <Grid item xs={5} className="picContainer">
              <img className="image9" src={contactUs} id="contactUs" alt="cartoon investor at computer " /></Grid> 
          <Grid item xs={5} className="formWrap" direction="columnrow">
        <form className="form" action="">
          <label>"Contact Kiddo about becoming an Investor."<br/></label>
          <input type="text" placeholder="enter message here"/>
          <button>Message Input</button>
        </form>
          </Grid>
        </Grid>

      </div>
    );
  }
  else{
    return(
      <h1>Bad Token, please login again</h1>
    )
  }
};

export default InvestorPortal;
