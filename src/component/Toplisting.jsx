import React,{memo,useState,useEffect} from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/TopListingTemp.css'
import '../css/common.css'
import {data} from '../databse/agentdata';
import {navbarImage} from "../databse/nav-bar-database"
import Agenttemplate from './Agenttemplate';
import Heading from '../common_components/Heading';
import axios from 'axios';
const settingses = 
{
  dots: true,
  infinite: true,
  speed: 1000,
  arrows:false,
  autoplay:true,
  mobilefirst:true,
  autoplaySpeed:4500,
  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  className: 'sliders',
}

function Toplisting() {
  const [sample,setsample]=useState([]);
  const get_data= async()=>{

    try{
      const response=await axios.post('https://backend-livespace.onrender.com/Listings/LimitedDisplay');
      // console.log(response.data);
      setsample(prev=>([...response.data]))
    }catch(e){console.log(e.message)}
  }
  useEffect(() => {
    get_data();
  }, [])
  return (
    <div className='toplisting-outer'>

    <div className="toplisting-main">
      <Heading small="Treding" large="Our Top Listing"/>
      <Slider {...settingses}>
        {sample.map((ele,index)=>(<Agenttemplate agent={ele} key={index} isagent={false} is_blank={true}/>))}
      </Slider>

    </div>
    </div>
  )
}

export default memo(Toplisting)