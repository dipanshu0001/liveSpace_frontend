import React, { memo } from 'react'
import '../css/Mobilenavbar.css'
import { navbarImage } from '../databse/nav-bar-database'
import { CiRuler } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { Media, MediaContextProvider } from '../media/breakpoint';
import L_r_button from './Buttons';
import { AiOutlineStar, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import { set_err } from '../Functions/Auth-Provider-Functions';

function Mobilenavbar({ data, details, is_details }) {
    const [isfav, setfav] = React.useState(data.fav);
    const navigate =useNavigate()
    const handleLink = () => {
        const websiteLink = window.location.href;
        var textArea = document.createElement('textarea');
        textArea.value = websiteLink
        document.body.appendChild(textArea);
        textArea.select();
        //When called on a textarea element, it selects the entire text content of the textarea, 
        // making it highlighted and ready to be copied to the clipboard or otherwise manipulated.
        navigator.clipboard.writeText(websiteLink).
            then(() => {
                document.body.removeChild(textArea)
                set_err("successfully Link copied", 1);
            }).catch(err => {
                set_err("Unable able to copy Link", 3);
            })
    }
    return (
        <div className="mobile_navbar">
            <div className="mob-lisiting-css" >
                <div className="mob-list-m">
                    <div className="mob-l-price mob-m-details">
                        <div className="mob-m-head">{data.Name}</div>
                        <div className="mob-m-extra">{data.Description}</div>
                    </div>
                </div>
                <div className="mob-list-r">
                    <div className="mob-r-social">
                        <div onClick={handleLink} style={{cursor:'pointer'}}><AiOutlineShareAlt size={20} className="share"  /></div>
                        <div onClick={()=>navigate('/Form')} style={{cursor:'pointer'}}><BsCalendar3 size={20} values="get Scheduling" className="calender" /></div>

                    </div>
                    <div className="mob-r-type">
                        <span className="mob-r-flex" ><span>Type</span><span>{data.Type}</span></span>
                        <span className="mob-r-flex" ><span>View</span><span>{data.View}</span></span>
                        <span className="mob-r-flex" ><span>Lot size</span><span>{data.Size}</span></span>
                        <span className="mob-r-flex" ><span>Condition</span><span>{data.Condition}</span></span>
                    </div>
                </div>
                <div className="mob-list-l">
                    <div className="mob-l-price">
                        <div className="mob-for-sale">
                            <span className="grey-text">FOR SALE</span>
                            <span>{data.price}</span>
                        </div>
                        <div className="mob-mortage">
                            <span className="grey-text">EST.MORTAGE</span>
                            <span className="mob-mortage-value grey-text">{data.EST_MORTAGE}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mob-l-details">
                {
                    !is_details ? (<L_r_button data={details} className="btn" Where_to={`See_details/${data._id}`} />) : (<L_r_button data={details} className="btn" is_blank={true} />)
                }
            </div>

        </div>
    )
}

export default memo(Mobilenavbar)
{/* <div className="mob-m-size">
                            <span className="mob-Beds"><BiBed size={30} /> <span className="grey-text">BEDS</span> <span>{data.Beds}</span></span>
                            <span className="mob-Baths"><GiBathtub size={30} /> <span className="grey-text">Baths</span> <span>{data.Baths}</span></span>
                            <span className="mob-SQFT"><CiRuler size={30} /> <span className="grey-text">SQFT</span><span>{data.SQFT}</span></span>
                        </div> */}