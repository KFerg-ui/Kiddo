import React , { useState, useEffect } from "react";
import "./CustomerServicePortal.css";
// import findCompanies from "./findCompanies";
import Table from "./table/Table.tsx";



const CustomerServicePortal = () => {
  const [investorList, setInvestorList] = useState([]);


  const [verification, setVerification] = useState(false);
  const [count, setCount] = useState(-1);


  let token = localStorage.getItem("token");


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
        setInvestorList(data.investors)

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
    return (
      <div>
        <Table investorList = {investorList}/>
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
