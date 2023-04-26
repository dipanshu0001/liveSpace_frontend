import React from 'react'
import { Feedback_data } from '../databse/Feedback_data'
import Feedback from './Feedback'
import "../css/All_feedback.css"
import { BiLike } from 'react-icons/bi'
import L_r_button from './Buttons'
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import backgroundImage from '../images/feedback.jpg'



function All_feedback() {
  // const[isliked,setLiked]=React.useState(0)
  return (
    <div className="All_feedback_main">
      <div className='img-outer'>
        <div className="img-div" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        </div>
        <div className="content">
          <span>Feedback</span>
          <ul>
            <li><a className='home-icon' href="/"> <AiOutlineHome size={20} className='changecolor' style={{ paddingBottom: "3px" }} /></a></li>
            <li>/</li>
            {/* <li><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></li> */}
            <li><span>Feedbacks</span></li>
          </ul>
        </div>
      </div>
      <center><h1>ALL Feedback</h1></center>
      <div className="internal_feedback">
        {
          Feedback_data.map((item, index) => {
            return (<Feedback key={index} {...item} />)
          })

        }
      </div>
      <L_r_button data="Back" Where_to={-1} is_blank={false} />


    </div>
  )
}

export default All_feedback