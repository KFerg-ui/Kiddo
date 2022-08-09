import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/'>How it works</Link>
            <Link to='/investors'>Investors</Link>

          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
          </div>
        </div>
        <div className='footer-link-items'>
          <h2>Join Kiddo</h2>
       </div>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
    
      <div className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/home' className='social-logo'>
              KIDDO
            </Link>
          </div>
          <div className='website-rights'>KIDDO © 2022</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;