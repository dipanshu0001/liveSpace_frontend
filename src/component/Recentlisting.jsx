import React, { memo ,useState,useEffect} from 'react'
import '../css/Recentlisting.css'
import Agenttemplate from './Agenttemplate'
import { data } from '../databse/agentdata'
import { navbarImage } from '../databse/nav-bar-database'
import { BiArrowToRight } from 'react-icons/bi';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/common.css'
import Heading from "../common_components/Heading"
import axios from 'axios';



const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  mobileFirst: true,
  speed: 500,
  autoplaySpeed: 2000,
  cssEase: "linear",
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  className:'slides',
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      }
    },
  ],


};
function Recentlisting() {
    const [sample,setsample]=useState([]);
    
    const get_data= async()=>{

      try{
        const response=await axios.post('https://backend-livespace.onrender.com/Listings/LimitedDisplay',{quantity:5});
        // console.log(response.data);
        setsample(prev=>([...response.data]))
      }catch(e){console.log(e.message)}
    }
    useEffect(() => {
      get_data();
      // console.log(sample);  
    }, [])
  
  return (
    <div className="recent">
    <Heading small="Find your Home" large="Recent Listing"/>
      <Slider {...settings} >
        {
          sample.map((ele, index) => (
            // console.log(ele)
            <Agenttemplate agent={ele} key={index} isagent={true} is_category={false}/>
          ))
        }
      </Slider>
    </div>
  )
}

export default memo(Recentlisting)