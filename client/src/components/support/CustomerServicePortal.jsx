import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CustomerServicePortal.css";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";

const CustomerServicePortal = () => {
  const [verification, setVerification] = useState(false);
  const [count, setCount] = useState(-1);
  const [arry , setArry] = useState();
  const [nameBool, setNameBool] = useState(true);
  const [nameStatus, setNameStatus] = useState("");
  const [contactBool, setContactBool] = useState(true);
  const [contactStatus, setContactStatus] = useState("");
  let token = localStorage.getItem("token");
  let companyNames = [];
  let link = "";

  function nameSort(){
    setContactStatus("")
    setContactBool(true)
    if(nameBool){
      findCompanies("business",1)
      setNameBool(!nameBool)
      setNameStatus("↑");
    }
    else{
      findCompanies("business",-1)
      setNameBool(!nameBool)
      setNameStatus("↓")
    }
  }
  function contactSort(){
    setNameStatus("")
    setNameBool(true)
    if(contactBool){
      findCompanies("contact",1)
      setContactBool(!contactBool)
      setContactStatus("↑");
    }
    else{
      findCompanies("contact",-1)
      setContactBool(!contactBool)
      setContactStatus("↓")
    }
  }


  function findCompanies(method, reverse){
    if(!method){
      method = "business"
      reverse = 1;
    }
    fetch('http://localhost:8000/customer-service', {
      method: 'GET',
      headers: {
        "accesstoken": token,
        "sort": method,
        "reverse": reverse
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
    }, 3600000);
    findCompanies();
  },[count]);

  

  if(verification){
    arry.companies.forEach((company) => {
      link = `/support/${company.business.replace(" ","_")}`
      if(!company.contact == ""){
        company.contact[0] = "no date attached"
      }
      companyNames.push(
        <Link to={link} className = "businessLink">
          <Grid container className = "listContainer" justify-content = "center">
            <Grid item xs = {5}>
              {company.business}
            </Grid>
            <Grid item xs = {5}>
              {company.contact[company.contact.length -1]}
                
            </Grid>
          </Grid>
        </Link>);
    });
  
    return (
      <div>
        <Grid container className="gridWrapContainer" direction="row" justifyContent= "center">
          <Grid item xs={10} className="gridDBListContainer" direction="column">
            <h1>Investor Data</h1>
          </Grid>
          <Grid item xs={10} className="gridDBListWrap" direction="column">
            Company Database list
            <Grid container className = "sortButtons" justifyContent="space-around">
              <Grid item className ="nameSort">
                <button onClick={nameSort}>Name {nameStatus}</button>
              </Grid>
              <Grid item className="lastContactSort">
                <button onClick={contactSort}>Recent Contact {contactStatus}</button>
              </Grid>
            </Grid>
            <Grid item xs={10} className="gridCompanyListWrap" direction="row">
              <Grid container className="bigListContainer" direction ="column">
                {companyNames}
              </Grid>
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
