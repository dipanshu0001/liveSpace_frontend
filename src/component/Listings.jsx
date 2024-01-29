import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { navbarImage } from '../databse/nav-bar-database'
import Agenttemplate from './Agenttemplate'
import '../css/Listing.css'
import { AiOutlineHome} from "react-icons/ai";
import axios from 'axios';
import backgroundImage from '../images/agent-bg.jpg'

// import Navbar from './Navbar'


function Listings() {
  const [sample,setsample]=useState([]);
  
  const get_data= async()=>{

    try{
      const response=await axios.post(`http://localhost:4000/Listings/LimitedDisplay`);
      // console.log(response.data);
      setsample(prev=>([...response.data]))
    }catch(e){console.log(e.message)}
  }
  useEffect(() => {
    get_data();
    // console.log(sample);  
  }, [])
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
      <div className='img-outer'>
        <div className="img-div" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        </div>
        <div className="content">
          <span>Listing</span>
          <ul>
            <li><a href="/"><AiOutlineHome size={20} color="white" style={{paddingBottom:"3px"}}/></a></li>
            <li><span>/</span></li>
            <li><span>Listing</span></li>
          </ul>
        </div>

      </div>

        <div className="listings">
          <div>
            <center><h1>Listing</h1></center>
            <div className="details">

              {/* gere can add serach in future versions */}
              {
                sample.map((ele, index) => (
                  <div className="listing_details">
                    <Agenttemplate agent={ele} isagent={true} is_blank={true} key={index} />

                  </div>
                ))
              }
              {/* </div> */}


            </div>

          </div>

          <div className="map">
            <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=chitkara%20university+(My%20Business%20Name)&amp;t=&amp;z=10&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>

          </div>

          {/* <Outlet/> */}
        </div>
      </div>

    </>

  )
}

export default Listings