import React , { useState , useEffect } from "react";
import "./InvestorPortal.css";
import image8 from "../../assets/image-8.png";
import image9 from "../../assets/image-9.png";
import contactUs from "../../assets/contactUs.png";
import standingDesk from "../../assets/standingDesk.png";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";

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
          <Grid item xs={12} className="welcomeTitle" direction="row">

          <h1>Welcome (Investment Company/Name)</h1>
          </Grid>
        </div>

          <Grid container xs={12} className="picWrap pic8Wrap" direction="row" width="100%" height="100%">
            <Grid container xs={5} className="bulletPhrases">
              <Grid item className="bullet" xs={12}>
              <h2 className="investorTitle"><a href="../../assets/kiddoPresentations.pdf" download="kiddoPresentations.pdf">Download Kiddo Information</a></h2>
              </Grid>
              <Grid item className="bullet" xs={12}>
              <h2 className="investorTitle">Market Research </h2>
              </Grid>
              <Grid item className="bullet" xs={12}>         
              <h2 className="investorTitle">Business Model</h2> 
              </Grid>   
            </Grid> 
            <Grid item xs={5} className="picContainer">
              <img className='image8' src={image8} id="img8" alt="4 cartoon kids at a table" /></Grid>
          </Grid>
        
        
          <Grid container xs={12} className=" picWrap pic9Wrap" direction="row" width="100%" height="100%">
            <Grid item xs={5} className="picContainer">
              <img className="image9" src={image9} id="img9" alt="cartoon investor at computer " /></Grid> 
            <Grid item xs={5} className="bulletPhrases">
              <h2 className="investorTitle">KIDDO TEAM</h2>            
            </Grid>
          </Grid>

        <Grid container className="formWrapContainer" direction="column">
          <Grid item xs={12} className="picWrap">
          <h2 className="investorTitle">COMPANY STATISTICS</h2>
          </Grid>
        </Grid>

        <Grid container className="formWrapContainer" direction="row">
          <Grid item xs={5} className="formWrap">
        <form className="form" action="">
          <label>Contact Kiddo About Becoming An Investor<br/></label>
          <input id="input" type="text" placeholder="enter message here"/>
          <button className="send-btn">Send</button>
        </form>
          </Grid>
        </Grid>
        <ColorBlobs />
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
