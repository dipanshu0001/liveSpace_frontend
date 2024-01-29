import React,{memo,useState,useEffect} from 'react'
import {data} from '../databse/agentdata'
import Agentprofile from './Agentprofile'
import Slider from 'react-slick';
import '../css/Meetagent.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Recentlisting.css'
import axios from 'axios';
import Heading  from '../common_components/Heading';

const settings = {
  dots: true,
  infinite: true,
  // autoplay: true,
  // mobileFirst: true,
  speed: 500,
  // autoplaySpeed: 2000,
  // cssEase: "linear",
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  className: 'meet_sliders',
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

const Meetagent= () => {
  const[data,setData]=useState([]);
  useEffect(()=>{
    const get_agent=async()=>{
      try{
        const result=await axios.post(`http://localhost:4000/Agents/AllAgents`);
        console.log(result.data)
        setData(prev=>([...result.data]))

      }catch(err){
        console.log(err.message)
      }
    }
    get_agent();
  },[])
  return (
    <div className="meet-agent-main">
      {/* <div > */}
      <Heading className="heading" small="Our Backbone" large="Meet our Agents"/>

      {/* </div> */}
      <div className="meet-agent-content">
      <Slider {...settings} >      {
        data.map((ele,index)=>(
           <Agentprofile {...ele} key={index} isAll={false}/>
        ))
      }
      </Slider>
      </div>
    </div>
  )
}

export default memo(Meetagent)