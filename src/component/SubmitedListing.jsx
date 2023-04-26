import React, { useState, useEffect } from 'react'
import { useAuthData } from '../DataProvider/AccountProvider'
import axios from 'axios'
import { CiRuler } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import '../css/SubmitedListing.css'
import './SubmitTemplate.jsx'


function SubmitedListing() {
  const { details,set_err } = useAuthData();
  const [data, setData] = useState([])
  const mark=async(e)=>{
    try{
      console.log(e);
      const result=await axios.post('/Listings/MarkSold',{_id:e,uid:"o97F4U9nRhgpEQwfMBCUKUAD22q1"});
      // console.log(result.data.data)
      set_err(result.data.message,result.data.iserror)
      setData(prev=>([...result.data.data]))
    }catch(err){
      set_err(err.message,err.iserror)
      console.log(err)
    }
  }
  const Delete_by_id=async(e)=>{
    try{
      console.log(e);
      const result=await axios.post('/Listings/DeleteId',{_id:e,uid:"o97F4U9nRhgpEQwfMBCUKUAD22q1"});
      // console.log(result.data.data)
      set_err(result.data.message,result.data.iserror)
      setData(prev=>([...result.data.data]))
    }catch(err){
      set_err(err.message,err.iserror)
      console.log(err)
    }
  }
  useEffect(() => {
    const get_data = async () => {
      console.log(details.uid);
      const result = await axios.post('https://backend-livespace.onrender.com/Listings/SubmitedListing', { uid: "o97F4U9nRhgpEQwfMBCUKUAD22q1" })
      console.log(result.data);
      setData(prev => ([...result.data]))
    }
    get_data();
  }, [])
  return (
    <div className='submit-outer'>
      <div className="submit-main">
        
        <div className='submit-display'>
          <ul>
            {
              data.length > 0 && data.map((ele, index) => (
                <li className="submit-content" key={index}>
                  <div className="img">
                    <img src={ele.Thumbnail} style={{ width: '100' }} />
                  </div>
                  <div className='details'>
                    <div className="heading"><h4>{ele.Name}</h4></div>
                    <div className="headings-des">{ele.Description}</div>
                    <ul className="heading-other">
                      <li className='other-details'><BiBed size={30} />  <span>{ele.Beds}</span></li>
                      <li className='other-details'><GiBathtub size={30} />  {ele.Bath}</li>
                      <li className='other-details'><CiRuler size={30} /><span>{ele.Size}</span></li>
                    </ul>
                  </div>
                  <div className="submit-btns">
                    <button type="button" class="btn btn-primary" disabled={ele.Sale}  onClick={()=>mark(ele._id)}>Mark as Sold</button>
                    <button type="button" disabled={ele.Pending} class="btn btn-info" onClick={()=>mark(ele._id)}>Mark as Pending</button>
                    <button type="button" class="btn btn-danger" onClick={()=>Delete_by_id(ele._id)}>Delete Listing</button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>


      </div>
    </div>
  )
}

export default SubmitedListing