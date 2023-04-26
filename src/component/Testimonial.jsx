import React from 'react'
import Feedback from './Feedback'
import '../css/Testimonial.css'
import Heading from '../common_components/Heading'
import { Feedback_data } from '../databse/Feedback_data.js';
import  L_r_button  from './Buttons';
function Testimonial() {
  return (
    <div className="Testi-main">
      <div className="heading_all_feedback">
      <Heading small="Testimonial" large="What Are People Saying" />
      
      <L_r_button data="View all feedback" Where_to="/All_feedback" is_blank={false}/>
      </div>

      <div className="Testi-content">
          {
            Feedback_data.map((ele, index) => (
              <Feedback {...ele} key={index} />
            ))
          }
      </div>

    </div>
  )
}

export default Testimonial