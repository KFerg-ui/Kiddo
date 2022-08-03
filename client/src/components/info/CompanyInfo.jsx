import React from "react";
import "./CompanyInfo.css";
import { Grid } from "@mui/material";

const CompanyInfo = () => {
  return (
    <div>
      <Grid container className="gridWrapContainer" direction="row">
        <Grid item xs={10} className="gridDBListContainer" direction="column">
          <h1>Company Name</h1>
        </Grid>
        <Grid item xs={10} className="gridDBListWrap" direction="column">
          Company Name
          <Grid item xs={10} className="gridCompanyListWrap" direction="row">
            <ul>
              <li>Name {1 + 0}</li>
              <li>Phone {2 + 0}</li>
              <li>Address {3 + 0}</li>
              <li>Business {4 + 0}</li>
              <li>Contact Date / times of last contact {5 + 0}</li>
              <li>Investment Amount</li>
              <li>Notes</li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
      <h1>Company Name</h1>
    </div>
  );
};

export default CompanyInfo;
