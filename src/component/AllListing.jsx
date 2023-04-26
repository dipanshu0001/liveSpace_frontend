import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CiRuler } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import '../css/SubmitedListing.css'
import './SubmitTemplate.jsx'
import { useAuthData } from '../DataProvider/AccountProvider'
import Agent_model from './Agent_model';

function AllListing() {
    const [data, setData] = useState([]);
    const { set_err } = useAuthData()
    const [value,setValue]=useState(0);
    useEffect(() => {
        const get_data = async () => {
            try {
                const result = await axios.post('https://backend-livespace.onrender.com/Listings/GetAllListing');
                setData(prev => ([...result.data]))
            } catch (err) {
                set_err(err.message, err.iserror);

            }
        }
        get_data();
    }, [value])
    const mark=()=>{
        console.log("heelo");
    }
    const Delete_by_id = ()=>{
        console.log("Hello");
    }
    return (
        <div className='submit-outer'>
            <div className="submit-main">
{/* <Agent_model/> */}
                <div className='submit-display'>
                    <ul>
                        {
                            data.length > 0 && data.map((ele, index) => (
                                <li className="submit-content" key={index}>
                                    <div className="img">
                                        <img src={ele.Thumbnail} style={{ width: '100%', width: '100%' }} />
                                    </div>
                                    <div className='details'>
                                        <div className="heading"><h4>{ele.Name}</h4></div>
                                        <div className="headings-des">{ele.Description}</div>
                                        <ul className="heading-other">
                                            <li className='other-details'><BiBed size={30} />  <span>{ele.Beds}</span></li>
                                            <li className='other-details'><GiBathtub size={30} />  {ele.Bath}</li>
                                            <li className='other-details'><CiRuler size={30} /><span>{ele.Size}sq.ft</span></li>
                                        </ul>
                                    </div>
                                    <div className="submit-btns">
                                        {/* <button type="button" class="btn btn-primary" disabled={ele.Sale} onClick={() => mark(ele._id)}>Assgin Agent</button> */}
                                        <Agent_model Listing_id={ele._id} update={setValue}/>
                                        <button type="button"  class="btn btn-info" onClick={() => mark}>Set Commision</button>
                                        <button type="button" class="btn btn-danger" onClick={() => Delete_by_id(ele._id)}>Delete Listing</button>
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

export default AllListing