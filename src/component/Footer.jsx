import React from 'react'
import '../css/Footer.css'
function Footer() {
  return (
    <div class="footer">
      <div class="row">
        <div class="col-lg-5 col-sm-12 footer-widget">
          <div class="footer-logo">
            <img src={require('../images/logo.png')} alt="acres" />
            <h4>Live Space</h4>
          </div><p>LiveSpace is your ultimate online real estate destination! We help you discover your dream home by providing a platform to upload and view property listings from all over. Say goodbye to the hassle of house hunting and let us help you find your perfect space!</p>
        </div>
        <div class="col-lg-2 offset-lg-1 col-sm-4 footer-widget">
          <h5 class="widget-title">Menu</h5>
          <ul><li> <a href="/themes/react/acres/listing-map">Find Home</a>
          </li><li> <a href="/themes/react/acres/submit-listing">Add Listing</a>
            </li><li> <a href="/themes/react/acres/listing-map">Listings</a>
            </li><li> <a href="/themes/react/acres/blog-grid">Blog</a> </li>
          </ul>
          </div><div class="col-lg-2 col-sm-4 footer-widget">
          <h5 class="widget-title">Information</h5><ul>
            <li> <a href="/themes/react/acres/about">About Us</a>
            </li><li> <a href="/themes/react/acres/contact">Contact Us</a> </li>
            <li> <a href="/themes/react/acres/services">Services</a> </li>
            <li> <a href="/themes/react/acres/faq">FAQ</a> </li>
          </ul>
        </div>
        <div class="col-lg-2 col-sm-4 footer-widget">
          <h5 class="widget-title">Legal</h5>
          <ul>
            <li> <a href="/themes/react/acres/legal">Privacy Policy</a> </li>
            <li> <a href="/themes/react/acres/legal">Refund Policy</a> </li>
            <li> <a href="/themes/react/acres/legal">Cookie Policy</a> </li>
            <li> <a href="/themes/react/acres/legal">Legal Terms</a> </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer