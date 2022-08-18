import React , { useState, useEffect } from "react";
import "./CustomerServicePortal.css";
import Table from "./table/Table.tsx";



const CustomerServicePortal = () => {
  const [investorList, setInvestorList] = useState([]);
  const [verification, setVerification] = useState(false);
  const [count, setCount] = useState(-1);

  useEffect(() => {

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  let token = localStorage.getItem("token");

  const submitFunc = async (e) => {
    e.preventDefault();
    findCompanies(e.target[1].value, e.target[0].value)
  }


  function findCompanies(search, method){
    if(!search){
      search = "";
      method = "business"
    }
    fetch('http://localhost:8000/customer-service', {
      method: 'GET',
      headers: {
        "accesstoken": token,
        "search": search,
        "method": method
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
        <form className="searchForm" onSubmit= {submitFunc}>
          <select>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="business">Business</option>
            <option value="email">Email</option>
          </select>
          <input type= "text" placeholder="Search"/>
          <button>Search</button>
        </form>
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