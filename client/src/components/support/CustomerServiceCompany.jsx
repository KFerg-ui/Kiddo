import React , { useState, useEffect } from "react";
import "./CustomerServicePortal.css";
import { Grid } from "@mui/material";

import { useParams } from 'react-router-dom';


export default function CustomerServiceCompany(props) {
    const [verification, setVerification] = useState(false);
    const [count, setCount] = useState(-1);
    const [arry , setArry] = useState();
    let { company } = useParams();
    let token = localStorage.getItem("token");
    let companyData = [];
    let dateArry = [];
    let companyName = "";
    let investmentArry = [];

    function findCompany(){ // need to find work around for spaced business names
    fetch(`http://localhost:8000/customer-service/${company}`, {
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
      findCompany();
    },[count]);
  
    
  
    if(verification){
        if(arry.company){
            companyName = arry.company.business;
            companyData.push(<ul><h3>{arry.company.business}</h3></ul>);
            companyData.push(<ul>email: {arry.company.email}</ul>);
            companyData.push(<ul>Name: {arry.company.firstName} {arry.company.lastName}</ul>);
            companyData.push(<ul>Contact Dates:
                {arry.company.contact.forEach((date) => {
                    dateArry.push(<ul>{date}</ul>)
                })}
                {dateArry}
            </ul>)
            companyData.push(<ul>Investment Data:
                {arry.company.investment.forEach((investment) =>{
                    investmentArry.push(<ul>{investment}</ul>)
                })}
                {investmentArry}
            </ul>)
        }
        else{
            companyData.push("Bad info, please contact backend")
        }
    
      return (
        <div>
          <Grid container className="gridWrapContainer" direction="row" justifyContent= "center">
            <Grid item xs = {10}>
                <Grid container className="gridDBListContainer" direction="column">
                    <Grid item xs = {10}><h1>Company Browser</h1></Grid>
                </Grid>
                <Grid container className="gridDBListWrap" direction="column">
                    <Grid item xs={10}>{companyName}</Grid>
                    <Grid item xs={10} className="gridCompanyListWrap">
                        <ul>
                          List Start
                          {companyData}
                        </ul>
                    </Grid>
                </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
    else{
      return(
        <div><h1>Bad Token, please login again</h1></div>
      )
    }
};
