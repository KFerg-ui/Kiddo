import React, { useState, useEffect } from "react";
import "./InvestorPortal.css";
import image8 from "../../assets/image-8.png";
import image9 from "../../assets/image-9.png";
import contactUs from "../../assets/contactUs.png";
import standingDesk from "../../assets/standingDesk.png";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";
import PDF from "../../assets/kiddoBusinessPlan.pdf"

const InvestorPortal = () => {
  const [verification, setVerification] = useState(false);
  const [count, setCount] = useState(-1);
  let token = localStorage.getItem("token");

  function verify() {
    fetch("http://localhost:8000/verifyUser", {
      method: "GET",
      headers: {
        accesstoken: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          setVerification(true);
        } else {
          setVerification(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 5000);
    verify();
  }, [count]);

  if (verification) {
    return (
      <div>
        <div>
          {" "}
          <Grid item xs={12} className="welcomeTitle" direction="row">
            <h1>welcome!</h1>
          </Grid>
        </div>

        <Grid
          container
          xs={12}
          className="picWrap pic8Wrap"
          direction="row"
          width="100%"
          height="100%"
        >
          <Grid container md={5} xs={10} className="bulletPhrases">
            <Grid container className="bullet" xs={12}>
              <h2 className="investorTitle">
                To get more detailed information about Kiddo, including our
                growth projections, business model, and position in the market,
                download our investor presentation here.
              </h2>
            </Grid>
            <Grid container className="bullet" xs={12}>
              {/* <Grid item className="download-btn" xs={12}> */}
                <a
                  href={PDF}
                  target='_blank' 
                  rel='noreferrer'
                  className="download-btn"
                >
                  KIDDO INFO PACKET
                </a>
              {/* </Grid> */}
            </Grid>
            {/* <Grid item className="bullet" xs={12}>
              <h2 className="investorTitle">Market Research </h2>
              </Grid>
              <Grid item className="bullet" xs={12}>         
              <h2 className="investorTitle">Business Model</h2> 
              </Grid>    */}
          </Grid>
          <Grid item md={5} xs={10} className="picContainer">
            <img
              className="image8"
              src={image8}
              id="img8"
              alt="4 cartoon kids at a table"
            />
          </Grid>
        </Grid>

        <Grid
          container
          xs={12}
          className=" picWrap pic9Wrap"
          direction="row"
          width="100%"
          height="100%"
        >
          <Grid item xs={12} className="bulletPhrases">
            <h2 className="kiddoTeam">MEET THE KIDDO TEAM</h2>
          </Grid>
          <Grid container className="teamMembers" md={5} xs={8}>
            {" "}
            <h3 className="teamName">Emily Reynolds</h3>Emily Reynolds is the Project Manager for
            Kiddo. She has been working in the tech space for the last three
            years and has worked at both smaller scale companies and Estee
            Lauder. She brings training as a certified Scrum Master and has been
            developing Kiddo for the last two years.
          </Grid>
          <Grid container className="teamMembers" md={5} xs={8}>
            <h3 className="teamName">Lee Delarm</h3>Lee Delarm is the Chief Technology Officer. "One
            of my passions is helping people realize their potential! I put my
            time towards searching for new opportunities to help the
            under-served youth of the country. I love helping people solve their
            tech issues, working with others, and writing the next great horror
            novel on the side."{" "}
          </Grid>
          <Grid container className="teamMembers" md={5} xs={8}>
            {" "}
            <h3 className="teamName">Mary Kelley</h3>Mary Kelley is former childhood educator with
            nearly 30 years experience in the classroom. As an educator, she
            specialized in working with children with disabilities and has
            consulted with the State of Vermont on curriculum development and
            approval
          </Grid>
          <Grid container className="teamMembers" md={5} xs={8}>
            <h3 className="teamName">Matt Cropp</h3>Matt Cropp is an advisor to Kiddo. Matt Cropp is
            experienced in the co-op world. Matt is the Executive Director at
            Vermont Employee Ownership Center.{" "}
          </Grid>
        </Grid>

        <Grid container className="adBlurbContainer" direction="column">
          <Grid item xs={12} className="picWrap" margin-top="3em">
            <h2 className="advantageBlurb">
              "What makes Kiddo different is the way the application creates revenue. Other applications on the
              market create revenue using advertisements and data mining. Kiddo
              uses no advertisements and therefore significantly reduces harm to
              children. This gives us a distinct advantage of being a site that
              parents feel excited for their children to use."
            </h2>
          </Grid>
        </Grid>
        <Grid container className="formWrapContainer" direction="row">
          <Grid item xs={5} className="formWrap">
            <form className="form" action="">
              <label>
                Contact Kiddo About Becoming An Investor
                <br />
              </label>
              <input id="input" type="text" placeholder="enter message here" />
              <button className="send-btn">Send</button>
            </form>
          </Grid>
        </Grid>
        <ColorBlobs />
      </div>
    );
  } else {
    return <h1>Bad Token, please login again</h1>;
  }
};

export default InvestorPortal;
