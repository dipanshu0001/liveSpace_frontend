import React, { useEffect, useContext, useState, memo } from 'react'
import Navbar from './Navbar';
import '../css/common.css'
// import { navbarImage } from '../databse/nav-bar-database'
import { CiRuler } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { Media, MediaContextProvider } from '../media/breakpoint';
import Mobilenavbar from './Mobilenavbar'
import DesktopNavbar from './DesktopNavbar';
import { AiOutlineStar, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import { frwd_btn, bckd_btn } from '../common_components/Forwardarrow';
import '../css/Behindnavbar.css'





function Behindnavbar({  details, is_details, sample }) {
  // console.log(sample);
  const [index, setindex] = useState(0);
  const [data, setData] = useState(sample[0]);
  const inc = () => {
    // console.log(index);
    setindex(prev => ((prev + 1) % sample.length))
  }
  const dec = () => {
    // console.log(index);
    if (index === 0) {
      setindex(prev =>  sample.length - 1)
    }
    else
      setindex(prev => (prev - 1))
  }
  useEffect(() => {
    console.log(data.Thumbnail);
    setData(prev=>sample[index]);
  }, [index])


  return (
    <div className="main">
      <div className="behind-main" >
        {/* <Navbar /> */}
        <div className="img-div">
          <div className="img">
            <div className="main-img" >
              <img src={data.Thumbnail} />
            </div>
            {is_details !== true && <div className="arrow">
              <MdOutlineArrowBackIosNew size={50} onClick={dec} />
              <MdOutlineArrowForwardIos size={50} onClick={inc} />
            </div>}
          </div>
        </div>
        <div style={{ height: "100%" }}>
          <MediaContextProvider>
            <Media lessThan="lg">
              <Mobilenavbar data={data} details={details} is_details={is_details} />

            </Media>
            <Media greaterThan="lg">
              <DesktopNavbar data={data} details={details} is_details={is_details} />

            </Media>
          </MediaContextProvider>
          {/* <Navbar />  */}
        </div>
      </div>
    </div>
  )
}

export default memo(Behindnavbar)