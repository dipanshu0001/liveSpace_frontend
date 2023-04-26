import React, { useEffect,useContext,useState,memo } from 'react'
// import '../css/common.css'
import { FiFacebook } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import img from '../../images/logo.png'
import { L_r_button } from '../../Buttons/Buttons';
import { FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import {sidebar_isclicked} from '../../App'


function Navbar() {

  // console.log(sticky)
  const{is_clicked,setClicked}=useContext(sidebar_isclicked);
  const [isSticky, setSticky] = useState(false)
  const [ishum, setHum] = useState(false)
  function myFunction() {
    let nav_bar = document.getElementsByClassName("bottom-navbar")[0];
    let navbar_main = document.getElementsByClassName("navbar-main")[0];
    let upper_bar = document.getElementsByClassName("upper-navbar")[0];
    // var sticky=nav_bar.offsetTop;

    if (window.pageYOffset > nav_bar.offsetTop) {
      nav_bar.classList.add("sticky")
      upper_bar.classList.add("hidden")
      navbar_main.classList.add("width")
      setSticky(true)
      // upper_bar.classList.add("hidden");
    }
    else {
      setSticky(false)
      console.log(window.pageYOffset, isSticky)
      nav_bar.classList.remove("sticky")
      upper_bar.classList.remove("hidden")
      navbar_main.classList.remove("width")
      // upper_bar.classList.remove("hidden");
    }
  }
  useEffect(() => {
    if (isSticky === false)
      window.onscroll = function () {
        myFunction()
      }
  }, [isSticky])
  const changeHum = () => {
    setHum(prev => !prev)
    setClicked(ishum)
  }

  return (
    <div className="navbar-main">
      <div className="upper-navbar">
        <div className="social-links">
          <span><FiFacebook style={{ color: "white" }} /></span>
          <span><FaPinterestP style={{ color: "white" }} /></span>
          <span><FaLinkedinIn style={{ color: "white" }} /></span>
          <span><BsTwitter style={{ color: "white" }} /></span>
        </div>
        <div className="login-signup">
          <span>Login</span>
          <span>or</span>
          <span> Signup</span>
        </div>
        <div>
        </div>
        
      </div>
      <div className="ul-css bottom-navbar">
        <div className="logo">
          <img src={img} />
          
        </div>

        <li className={ishum ? "outer-logo" : "outer-logo"}>
          <div className="links">
            <li><h6>Home Page</h6></li>
            <li><h6>Blog</h6></li>
            <li><h6>Pages</h6></li>
            <li><h6>Listings</h6></li>
            <li><h6>Agents</h6></li>
            <li><h6>Agency</h6></li>
          </div>
          <L_r_button data="Submit Listing+"/>


        </li>
        <div className="mob_nav" onClick={changeHum}>
        {
          <GoThreeBars size={30} />
        }
      </div>
      </div>
      
    </div>
  )
}

export default memo(Navbar)