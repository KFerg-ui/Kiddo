import React from "react";
import "./CustomerServicePortal.css";
import { Grid } from "@mui/material";

const CustomerServicePortal = () => {
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
};

export default CustomerServicePortal;
