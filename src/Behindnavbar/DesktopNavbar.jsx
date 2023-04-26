import React,{memo} from 'react'
import '../css/DesktopNavbar.css'
import { navbarImage } from '../databse/nav-bar-database'
import img from '../images/drawing_room.jpg'
import { CiRuler } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { Media, MediaContextProvider } from '../media/breakpoint';
// import Mobilenavbar from './Mobilenavbar'
// import DesktopNavbar from './DesktopNavbar';
import { AiOutlineStar, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";

function DesktopNavbar({data}) {
  return (
    <div>
        <div className="lisiting-css" style={{ height: "40%" }}>
        <div className="list-l">
          <div className="l-details">See Details</div>
          <div className="l-price">
            <div className="for-sale">

              <span className="grey-text">FOR SALE</span>
              <span>{data.For_Sale}</span>
            </div>
            <div className="mortage">
              <span className="grey-text">EST.MORTAGE</span>
              <span className="mortage-value grey-text">{data.EST_MORTAGE}</span>
            </div>
          </div>
        </div>
        <div className="list-m">
          <div className="l-details hidden">

          </div>
          <div className="l-price m-details">
            <div className="m-head">{data.Location}</div>
            <div className="m-size">
              <span className="Beds"><BiBed size={30} /> <span className="grey-text">BEDS</span> <span>{data.Beds}</span></span>
              <span className="Baths"><GiBathtub size={30} /> <span className="grey-text">Baths</span> <span>{data.Baths}</span></span>
              <span className="SQFT"><CiRuler size={30} /> <span className="grey-text">SQFT</span><span>{data.SQFT}</span></span>
            </div>
            <div className="m-extra">Lorem Ipsum is simply dummy text of
              the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy like Aldus PageMaker including
              versions of Lorem Ipsum.</div>
          </div>
        </div>
        <div className="list-r">
          <div className="r-social">
            <AiOutlineShareAlt size={30}/>
            {/* <div>{s}</div> */}
            {data.fav === false ? <AiOutlineStar onClick={() => { console.log(data.fav) }} size={30}/> : <AiFillStar  size={30}/>}
            <BsCalendar3 size={30}/>
          </div>
          <div className="r-type">
            <span className="r-flex" ><span>Type</span><span>{data.type}</span></span>
            <span className="r-flex" ><span>View</span><span>{data.view}</span></span>
            <span className="r-flex" ><span>Lot size</span><span>{data.lot_size}</span></span>
            <span className="r-flex" ><span>Condition</span><span>{data.condition}</span></span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default memo(DesktopNavbar)