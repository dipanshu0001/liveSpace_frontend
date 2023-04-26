import React, { memo } from 'react'
import '../css/DesktopNavbar.css'
import { CiRuler } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { AiOutlineStar, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import L_r_button from './Buttons';
import { set_err } from '../Functions/Auth-Provider-Functions';

function DesktopNavbar({ data, details, is_details }) {
  // console.log(data);  
  // const [isfav, setfav] = React.useState(data.fav);
  const navigate=useNavigate();
  const handleLink = () => {
    const websiteLink = window.location.href;
    var textArea = document.createElement('textarea');
    textArea.value = websiteLink
    document.body.appendChild(textArea);
    textArea.select();
    //When called on a textarea element, it selects the entire text content of the textarea, 
    // making it highlighted and ready to be copied to the clipboard or otherwise manipulated.
    navigator.clipboard.writeText(websiteLink).
    then(()=>{
      document.body.removeChild(textArea)
      set_err("successfully Link copied", 1);
    }).catch(err=>{
      set_err("Unable able to copy Link", 3);
    })
  }
  return (
    <>
      <div className="lisiting-css" >
        <div className="list-l">
          <div className="l-details">
            {
              !is_details ? (<L_r_button data={details} className="btn" Where_to={`See_details/${data._id}`} />) : (<L_r_button data={details} className="btn" />)
            }
          </div>
          <div className="l-price">
            <div className="for-sale">

              <span className="grey-text">FOR SALE</span>
              <span>{data.Price}</span>
            </div>
            <div className="mortage">
              <span className="grey-text">EST.MORTAGE</span>
              <span className="mortage-value grey-text">{data.Price}</span>
            </div>
          </div>
        </div>
        <div className="list-m">
          <div className="l-details hidden">

          </div>
          <div className="l-price m-details">
            <div className="m-head">{data.Name}</div>
            <div className="m-size">
              <span className="Beds"><BiBed size={30} /> <span className="grey-text">BEDS</span> <span>{data.Beds}</span></span>
              <span className="Baths"><GiBathtub size={30} /> <span className="grey-text">Baths</span> <span>{data.Bath}</span></span>
              <span className="SQFT"><CiRuler size={30} /> <span className="grey-text">SQFT</span><span>{data.Size}</span></span>
            </div>
            <div className="m-extra">{data.Description}</div>
          </div>
        </div>
        <div className="list-r">
          <div className="r-social">

            <button className="share" onClick={handleLink}><AiOutlineShareAlt size={30} /></button>
            <button className="calendar" onClick={()=>navigate('/Form')}><BsCalendar3 size={30} /></button>
          </div>
          <div className="r-type">
            <span className="r-flex" ><span>Type</span><span>{data.Type}</span></span>
            <span className="r-flex" ><span>View</span><span>{data.View}</span></span>
            <span className="r-flex" ><span>Lot size</span><span>{data.Size}</span></span>
            <span className="r-flex" ><span>Condition</span><span>{data.Condition}</span></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(DesktopNavbar)