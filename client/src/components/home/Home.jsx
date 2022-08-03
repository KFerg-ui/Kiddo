import React from 'react'
import './Home.css'
import { Grid } from "@mui/material";
import video from '../../assets/animation.mp4'
import image1 from '../../assets/image-1.png'
import image2 from '../../assets/image-2.png'
import image3 from '../../assets/image-3.png'
import image4 from '../../assets/image-4.png'
import image5 from '../../assets/image-5.png'
import image7 from '../../assets/image-7.png'
const Home = () => {
  return (
    <div className='home'>
    <div className='container'>
      <h1 className='title'>KIDDO</h1>


      <video width="750" height="500" controls >
      <source src={video} id="vid1" type="video/mp4"/>
     </video>

<div className='register'>
    <button className='register-button'>Register Here</button>
  
</div>

<div className='mission-statement'>
  <h1>Our Mission</h1>
  <p>Kiddo is a new social network for children. Through a thorough understanding of the existing social media ecosystem we aim to develop Kiddo with fundamentally different values and priorities:
Our users are our customers, not our products. Kiddo will be ad-free, relying on small monthly subscription charges instead of advertisements. This alone removes most of the structural incentives for unhealthy social network features.
Our goal is to maximize child development and entertainment, not screen time. Kiddo recognizes it should be a small part of a much larger non-screen life for kids. We will rely on the insights of recognized childhood development experts to ensure an enriching and supportive environment.Our workers and users direct the future of Kiddo. Kiddo’s ownership and day-to-day decisions will be operated as a worker cooperative, with any outside investors having equity but no voice in governance. Users will have a voice on the future of Kiddo via elected, volunteer advisory boards.</p>
</div>



  <div className='images'>
<img src={image1} id="img1" alt="first image" />
<img src={image2} id="img2" alt="second image" />
<img src={image3} id="img3" alt="third image" />
<img src={image7} id="img7" alt="ads image" />

</div>

<div className='newsletter'>
<form>
  <input type="text" placeholder='name'></input>
  <input type="text" placeholder='email'></input>
  <button>Sign Up</button>
  
   </form>

</div>

</div>
</div>
   
  )
}

export default Home