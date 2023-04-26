import React, { useEffect,useContext,useState,memo } from 'react'
import Navbar from './Navbar/Navbar';
import './Behindnavbar.css'
import { navbarImage } from '../databse/nav-bar-database'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { Media, MediaContextProvider } from '../media/breakpoint';
import Mobilenavbar from './Mobilenavbar'
import DesktopNavbar from './DesktopNavbar';






function Behindnavbar() {
 
  const [index, setindex] = useState(0);
  const data = navbarImage[index];
  const inc = () => {
    setindex((index + 1) % navbarImage.length)
    // console.lof(index)
  } 
  const dec = () => {
    if (index === 0) {
      setindex(navbarImage.length - 1)
      console.log(index)
    }
    else
      setindex((index - 1))
    // console.lof(index)
  }
  useEffect(() => {
    // console.log(index)
    // console.log(navbarImage[index]) 
    // data= navbarImage[index];

  }, [index])
  
  // console.log(data)
  // console.log(typeof (imag))
  return (
    <div className="main">
      <div className="behind-main" >
        {/* <Navbar /> */}
        <div className="img-div">
          <Navbar />
          <div className="img">
            <img src={data.img} className="main-img" />
            <div className="arrow">
              <MdOutlineArrowBackIosNew size={50} onClick={dec} />
              <MdOutlineArrowForwardIos size={50} onClick={inc} />
            </div>
          </div>
        </div>
        <div style={{height:"100%"}}>
          <MediaContextProvider>
            <Media lessThan="lg">
              <Mobilenavbar data={data} />

            </Media>
            <Media greaterThan="lg">
              <DesktopNavbar data={data} />

            </Media>
          </MediaContextProvider>
          {/* <Navbar />  */}
        </div >
      </div>
    </div>
  )
}

export default memo( Behindnavbar)




// import { CiRuler } from "react-icons/ci";
// import { GiBathtub } from "react-icons/gi";
// import { BiBed } from "react-icons/bi";
// import { BsCalendar3 } from "react-icons/bs";
// import { AiOutlineStar, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
// import { frwd_btn,bckd_btn} from '../common_components/Forwardarrow';
// import img from '../images/drawing_room.jpg'
// import '../css/common.css'

