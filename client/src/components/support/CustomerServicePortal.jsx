import React , { useState, useEffect } from "react";
import "./CustomerServicePortal.css";
import { Grid } from "@mui/material";

const CustomerServicePortal = () => {
  const [verification, setVerification] = useState(false);
  const [count, setCount] = useState(-1);
  const [arry , setArry] = useState();
  let token = localStorage.getItem("token");
  let companyNames = [];

  function findCompanies(){
    fetch('http://localhost:8000/customer-service', {
      method: 'GET',
      headers: {
        "accesstoken": token
      } 
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.auth){
        setVerification(true)
        setArry(data) 
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
    findCompanies();
  },[count]);

  

  if(verification){
    arry.companies.forEach((company) => {
      companyNames.push(<li>{company.business}</li>);
    });
  
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
                {companyNames}
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
