import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CustomerServicePortal.css";
import { Grid } from "@mui/material";

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
  let output = "";

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

  const search = async (e) => {
    e.preventDefault();
    console.log("fetch")
  }

  function findCompanies(method, reverse, search){
    if(!method){
      method = "business"
      reverse = 1;
    }
    if(!search){
      search = "";
    }
    fetch('http://localhost:8000/customer-service', {
      method: 'GET',
      headers: {
        "accesstoken": token,
        "sort": method,
        "reverse": reverse,
        "search": search
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

  

  if(verification){ //figure out why formatting is different between dates
    arry.companies.forEach((company) => {
      link = `/support/${company.business.replace(" ","_")}`
      if(company.contact == ""){
        output = "no date attached";
      }
      else{
        output = company.contact[company.contact.length -1]
      }
      companyNames.push(
        <Grid container className = "listContainer" justifyContent = "space-around">
          <Grid item xs = {5} className = "business">
            <Link to={link} className = "businessLink">{company.business}</Link>
          </Grid>
          <Grid item xs = {5} >
            {output}
          </Grid>
        </Grid>)
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
              <Grid item className="searchBar">
                <form onSubmit={search}>
                  <input type="text"/>
                  <button>Search</button>
                </form>
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
