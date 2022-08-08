import React , { useState, useEffect } from "react";
import "./CustomerServicePortal.css";
import { Grid } from "@mui/material";

const CustomerServicePortal = () => {
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

  function findCompanies(){
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
        <Grid container className="gridWrapContainer" direction="row">
          <Grid item xs={10} className="gridDBListContainer" direction="column">
            <h1>Investor Data</h1>
          </Grid>
          <Grid item xs={10} className="gridDBListWrap" direction="column">
            Company Database list
            <Grid item xs={10} className="gridCompanyListWrap" direction="row">
              <ul>
                <li>Company {1 + 0}</li>
                <li>Company {2 + 0}</li>
                <li>Company {3 + 0}</li>
                <li>Company {4 + 0}</li>
                <li>Company {5 + 0}</li>
                <li>Company ...</li>
              </ul>
            </Grid>
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

export default CustomerServicePortal;
