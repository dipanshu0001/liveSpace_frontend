import React, { useEffect, useContext, useState, memo } from 'react'
import '../css/common.css'
import { FiFacebook } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { FaPinterestP, FaLinkedinIn } from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css'
import '../css/Aside.css'
import img from '../images/logo.png'
import L_r_button from './Buttons';
import { GoThreeBars } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom"
import { Button } from 'react-bootstrap';
import { useAuthData } from '../DataProvider/AccountProvider';
import { auth } from '../Functions/FireBase-config'
import { signOut } from 'firebase/auth'


function Navbar({ islisting }) {
  const navigate = useNavigate();
  const [is_clicked, setClicked] = useState(true);
  const [isSticky, setSticky] = useState(false)
  const { details, set_details } = useAuthData();
  const handlelogout = () => {
    auth.signOut().then(() => {
      console.log('logged out successfully')
      set_details({
        accessToken: "",
        displayName: "",
        profileUrl: "",
        email: "",
        islogged_in: false,
      });
    }).catch(err => console.log(err.message))
  }



  function myFunction() {
    let nav_bar = document.getElementsByClassName("bottom-navbar")[0];
    let navbar_main = document.getElementsByClassName("navbar-main")[0];
    let upper_bar = document.getElementsByClassName("upper-navbar")[0];

    if (window.scrollY > 100) {
      nav_bar.classList.add("sticky")
      upper_bar.classList.add("hidden")
      navbar_main.classList.add("width")
      setSticky(true)
      // console.log("ehjfksjdkfjsdf")
      // upper_bar.classList.add("hidden");
    }
    else {
      nav_bar.classList.remove("sticky")
      upper_bar.classList.remove("hidden")
      navbar_main.classList.remove("width")
      setSticky(false)
      // console.log("ehjfksjdkfjsdf")
      // upper_bar.classList.remove("hidden");
    }
  }
  useEffect(() => {
    // if (isSticky === false)
    window.addEventListener('scroll', myFunction)
    // console.log(details)  
    // console.log("helo from navbar ")
  }, [isSticky, details])
  const changeHum = () => {
    // setHum(prev => !prev)
    // setClicked(ishum)
    // console.log("helo");
    setClicked(prev => !prev)

  }


  return (
    <div className={!islisting ? "navbar-main" : "navbar-main navbar_width"}>
      <div className={!islisting ? "upper-navbar" : "upper-navbar no_radius"}>
        <div className="social-links">
          <a href="https://www.facebook.com/login/" target="_blank"><FiFacebook className="fb" /></a>
          <a href="https://in.pinterest.com/login/" target="_blank"><FaPinterestP className="pintrest" /></a>
          <a href="https://www.linkedin.com/feed/" target="_blank"><FaLinkedinIn className="linkedin" /></a>
          <a href="https://twitter.com/login?lang=en" target="_blank"><BsTwitter className="twitter" /></a>
        </div>
        <div className="login-signup">
          {!details.isloggedin ?
            (<>
              <Link to='/Login'  className='login-link'>Login   </Link>
              <span>or</span>
              <Link to='/singup' className='login-link'>Signup </Link>
            </>) :
            (<>
              <Button onClick={handlelogout}>Logout</Button>
              <i className="fa-solid fa-user icon" style={{fontSize:"25px",cursor:"pointer"}} onClick={()=>navigate("/Profile")}></i>
            </>)
          }
        </div>



      </div>
      <div className="ul-css bottom-navbar">
        <div className="logo">
          <img src={img} onClick={() => navigate("/")} />

        </div>

        <li className={"outer-logo"}>
          <div className="links">
            <li><Link to="/"><h6>Home Page</h6></Link></li>
            <li><Link to="/Profile"><h6>Profile</h6></Link></li>
            <li><Link to="/Listing" ><h6>Listings</h6></Link></li>
            <li><Link to="/Agents" ><h6>Agents</h6></Link></li>
            <li><Link to="/Categories"><h6>Categories</h6></Link></li>
          </div>
          <L_r_button data="Submit Listing+" Where_to="Form" is_blank={false} />
          {/* <button data="Submit Listing+" onClick={()=>navigate("Form")}>submit Listing</button> */}


        </li>
        <div className="mob_nav" onClick={changeHum}>
          {
            <GoThreeBars size={30} />
          }
        </div>

      </div>
      {
        (<div className={is_clicked ? "aside-main" : "aside-main open"}>
          <div className="menu-outer" >
            <span className="heading-mob">Menu</span>
            <i className="icon cross" onClick={() => setClicked(prev => !prev)} > </i>

          </div>
          <div className="aside-scroll">
            <ul>
              <li className="heading-mob">Pages</li>
              <li>
                <Link to="/">
                  <i className="fas fa-home icon"></i>
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/Profile">
                  <i className="fa-solid fa-user icon  "></i>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/Listing" >
                  <i className="icon pages fa-solid fa-list"></i>
                  Listings
                </Link>
              </li>
              <li>
                <Link to="/Agents">
                  <i className="icon listing fa-solid fa-headset"></i>
                  Agents
                </Link>
              </li>
              <li>
                <Link to="/Categories">
                  <i className="icon blog fa-solid fa-layer-group"></i>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/Form">
                  {/* <i className="icon fa-regular fa-memo"></i> */}
                  <i class="fa-sharp fa-regular fa-file icon"></i>
                  Submit Listing
                </Link>
              </li>
              <li className="heading-mob"> Get Social</li>
              <li>
                <a href="/Login" >
                  <i className="icon fa-solid fa-right-to-bracket"></i>
                  Login
                </a>
              </li>
              <li>
                <a href="/Singup" >
                  <i className="fa-solid fa-user-plus icon"></i>
                  Singup
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/login/" target="_blank">
                  <i className="icon facebook"></i>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://in.pinterest.com/login/" target="_blank">
                  <i className="fa-brands fa-pinterest-p icon pintrests"></i>
                  
                  Pintrest
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/feed/" target="_blank">
                  <i className="fa-brands fa-linkedin-in icon "></i>
                 
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com/login?lang=en" target="_blank">
                  <i className=" fa-brands fa-twitter icon"></i>
                  Twitter
                </a>
              </li>
            </ul>

          </div>




        </div>)
      }

    </div>
  )
}

export default memo(Navbar)