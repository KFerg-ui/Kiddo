
import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import video from "../../assets/animation.mp4";
import image1 from "../../assets/image-1.png";
import image2 from "../../assets/image-2.png";
import image3 from "../../assets/image-3.png";
import image4 from "../../assets/image-4.png";
import image5 from "../../assets/image-5.png";
import image7 from "../../assets/image-7.png";
import { Grid } from "@mui/material";
import ColorBlobs from "../colorBlobs/ColorBlobs";




const Home = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [submission, setSubmission] = useState("");

  useEffect(() => {

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  
  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/newsletter', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      } 
    })
    .then((response) => response.json())
    .then((data) => {
      if(!data.duplicate){
        setSubmission("Thank you for signing up! We will contact you in the future")
      }
      else{
        setSubmission("Error: Email has already been used to sign up for newsletter")
      };
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    // Start of Exp. BLOBS CITY!
    <>
      <Grid container className="gridHomeContainer" justifyContent="center">
        <h1 className="title">kiddo.</h1>
        <h1 className="kiddoUnderline">WHERE KIDS COME FIRST</h1>
        <Grid container className="animation" xs={12}>
          <Grid item className="videoWrap" xs={9}>
            <video data-testid = "video" className="videoBox" width="100%" height="100%" controls>
              <source src={video} id="vid1" type="video/mp4" />
            </video>
          </Grid>
        </Grid>
        <Grid item className="missionGrid" xs={12}>
          <div className="joinFamily">
            <h1 className="familyOverline">JOIN THE KIDDO FAMILY</h1>
          </div>
          <div className="joinFamily">
          <h2 className="investorPrompt">Become an investor in our groundbreaking new social media platform for children ages 8-12.</h2>
          </div>
          <div className="register">
            <Link to="/register" className="register-button">Register Here</Link>
          </div>

          <div className="mission-statement">
            <h1 className="missionHead"><span>OUR MISSION</span></h1>
            <p width="100%" className="missionText">
              Kiddo is a new social network for children. Through a thorough
              understanding of the existing social media ecosystem we aim to
              develop Kiddo with fundamentally different values and priorities:
              Our users are our customers, not our products. Kiddo will be
              ad-free, relying on small monthly subscription charges instead of
              advertisements. This alone removes most of the structural
              incentives for unhealthy social network features. Our goal is to
              maximize child development and entertainment, not screen time.
              Kiddo recognizes it should be a small part of a much larger
              non-screen life for kids. We will rely on the insights of
              recognized childhood development experts to ensure an enriching
              and supportive environment.Our workers and users direct the future
              of Kiddo. Kiddo’s ownership and day-to-day decisions will be
              operated as a worker cooperative, with any outside investors
              having equity but no voice in governance. Users will have a voice
              on the future of Kiddo via elected, volunteer advisory boards.
            </p>
          </div>
        </Grid>
        <Grid
          container
          className="infoBoxes"
          xs={12}
          justifyContent="space-evenly"
          sx={{ flexDirection: { md: "row" } }}
        >
          <Grid
            container
            className="infoOne"
            justifyContent="space-evenly"
            md={5}
            xs={9}
          >
            <Grid item className="imageOne" xs={5}>
              <img src={image1} id="img1" alt="first image" width="100%" height="100%" />
            </Grid>
            <Grid item className="infoText" xs={5}>
              <p>designed with childhood development experts</p>
            </Grid>
          </Grid>

          <Grid
            container
            className="infoOne"
            md={5}
            xs={9}
            justifyContent="space-evenly"
          >
            <Grid item className="imageOne" xs={5}>
              <img src={image2} id="img2" alt="second image" width="100%" height="100%"/>
            </Grid>
            <Grid item className="infoText" xs={5}>
              <p>focused on safety and privacy</p>
            </Grid>
          </Grid>

          <Grid
            container
            className="infoOne"
            md={5}
            xs={9}
            justifyContent="space-evenly"
          >
            <Grid item className="imageOne" xs={5}>
              <img src={image3} id="img3" alt="third image" width="100%" height="100%"/>
            </Grid>
            <Grid item className="infoText" xs={5}>
              <p>all content age appropriate</p>
            </Grid>
          </Grid>

          <Grid
            container
            className="infoOne"
            md={5}
            xs={9}
            justifyContent="space-evenly"
          >
            <Grid item className="imageOne"  xs={5}>
              <img src={image7} id="img7" alt="ads image" width="100%" height="100%"/>
            </Grid>
            <Grid item className="infoText" xs={5}>
              <p>100% Ad Free!</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="newsies" xs={12}>
          <form onSubmit={onSubmit} className="newsForm">
            <Grid item xs={12} >
              <h2 className="newsTitle">SIGN UP FOR FUTURE UPDATES</h2>
            </Grid>
            <Grid item className="label" xs={12}>
              Name
            </Grid>
            <Grid item className="inputName" xs={12}>
              <input
                type="text"
                className="inputField"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </Grid>
            <Grid item className="label" xs={12}>
              Email{" "}
            </Grid>
            <Grid item className="inputName" xs={12}>
              <input
                type="text"
                className="inputField"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                ></input>
            </Grid>
            <Grid item className="label" xs={12}>
              Phone
            </Grid>
            <Grid item className="inputName" xs={12}>
              <input
                type="text"
                className="inputField"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></input>
            </Grid>
            <Grid item className="newsButton" xs={12}>
              <input className="newsButtonStyle" type="Submit"/>
            </Grid>
            <p>{submission}</p>
          </form>
      </Grid>
      <ColorBlobs/>
    </Grid>
    </>
  );
};

export default Home;
