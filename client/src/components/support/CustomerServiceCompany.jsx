import React, { useState, useEffect } from "react";
import "./CustomerServiceCompany.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";


export default function CustomerServiceCompany(props) {
  const [verification, setVerification] = useState(false);
  const [count, setCount] = useState(-1);
  const [arry, setArry] = useState();
  const [message, setMessage] = useState(``);
  let { company } = useParams();
  let token = localStorage.getItem("token");
  let companyData = [];
  let messageData = [];
  let dateArry = [];
  let companyName = "";
  let investmentArry = [];

  function findCompany() {
    // need to find work around for spaced business names

    let rootURL;
    if (document.location.hostname.includes("localhost")) {
      rootURL = `http://localhost:8000`;
    } else {
      rootURL = `https://${document.location.hostname}`;
    }

    fetch(`${rootURL}/customer-service/${company}`, {
      method: "GET",
      headers: {
        accesstoken: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          setVerification(true);
          setArry(data);
        } else {
          setVerification(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const addNotes = async (e) => {
    e.preventDefault();

    let note = e.target.elements.note.value;

    
    let rootURL;
    if (document.location.hostname.includes("localhost")){
      rootURL = `http://localhost:8000`
    } else {
      rootURL = `https://${document.location.hostname}`
    }

    fetch(`${rootURL}/customer-service/notes/${company}`, {
      method: "GET",
      headers: {
        accesstoken: token,
        note: note,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Notes Updated");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 5000);
    findCompany();
  }, [count]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (verification) {
    if (arry.company) {
      companyName = arry.company.business;
      companyData.push(
        <ul className="company-header">
          <h3>{arry.company.business}</h3>
        </ul>
      );
      companyData.push(
        <ul className="contact-info">Email: {arry.company.email}</ul>
      );
      companyData.push(
        <ul className="contact-info">Phone: {arry.company.phone}</ul>
      );
      companyData.push(
        <ul className="contact-info">Preferred Contact Method: {arry.company.preferredContact}</ul>
      );
      companyData.push(
        <ul className="contact-info">
          Name: {arry.company.firstName} {arry.company.lastName}
        </ul>
      );
      companyData.push(
        <ul className="contact-info">
          Contact Dates:
          {arry.company.contact.forEach((date) => {
            dateArry.push(<ul>{date}</ul>);
          })}
          {dateArry}
        </ul>
      );
      companyData.push(
        <ul className="contact-info">
          Investment Data:
          {arry.company.investment.forEach((investment) => {
            investmentArry.push(<ul>{investment}</ul>);
          })}
          {investmentArry}
        </ul>
      );
      arry.company.notes.forEach((note) => {
        messageData.push(<ul>{note}</ul>);
      });
    } else {
      companyData.push("Bad info, please contact backend");
    }

    return (
      <Grid container className="gridWrapContainer" direction="column" width = "95%">
        <Grid item xs={10}>
          <Grid container className="gridDBListContainer" direction="column">
            <Grid item xs={10}>
              <h1 className="browser-header">Company Browser</h1>
            </Grid>
          </Grid>
          <Grid container className="gridDBListWrap" direction="column">
            <Grid item xs={10}>
              {companyName}
            </Grid>
            <Grid container className="infoWrap">
              <Grid item xs={10} className="gridCompanyListWrap">
                <ul>{companyData}</ul>
              </Grid>
              <Grid item xs={12} className="notes">
                Notes
              </Grid>
              <Grid item xs={12} className="notes">
                <form onSubmit={addNotes}>
                  <input type="text" name="note" />
                  <button>Add Note</button>
                  <br />
                  {message}
                </form>
                <ul className="notesList">{messageData}</ul>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Link to="/support" className="supportBack">
                <h2>Back</h2>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <div>
        <h1>Bad Token, please login again</h1>
      </div>
    );
  }
}
