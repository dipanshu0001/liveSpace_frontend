import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import backgroundImage from '../images/agent-bg.jpg'
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical, BsTelephone, BsFillBookmarkFill, BsWindowSidebar } from "react-icons/bs";
import { BiMessageAltDetail } from "react-icons/bi";
import '../css/Agent_details.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { useAuthData } from '../DataProvider/AccountProvider'
import Agenttemplate from './Agenttemplate';

function Agent_detail() {
  const { set_err } = useAuthData();
  const { id } = useParams()
  const [agent_data, setDetail] = useState(null)
  const [agent_listing, setListing] = useState([])
  const [clicked, setClicked] = useState(false);
  const [form_data, set_data] = useState({
    user_email: "",
    mobile: "",
    message: ""
  });

  useEffect(() => {
    console.log(id)
    const get_all_data = async () => {
      try {
        const agent_result = await axios.post("https://backend-livespace.onrender.com/Agents/GetAgent", { uid: id })
        // console.log(agent_result.data);
        setDetail(prev => ({ ...agent_result.data }))
        const agent_listing_detail = await axios.post("https://backend-livespace.onrender.com/Agents/AgentListings", { uid: id })
        // console.log(agent_listing_detail.data)
        setListing(prev => ([...agent_listing_detail.data]))
      } catch (err) {
        console.log(err.response.data)
      }
    }
    get_all_data()
    console.log(agent_data)
  }, [])
  const f = (e) => {
    e.preventDefault();
  }
  const handleMessage = () => {
    axios.post("https://backend-livespace.onrender.com/Agents/SendEmail", { ...form_data, agent_email: agent_data.Gmail, agnt_name: agent_data.Name })
      .then(response => {
        set_err(response.data.message, response.data.iserror)
        set_data({
          user_email: "",
          mobile: "",
          message: ""
        })
      })
      .catch(err => set_err(err.data.message, err.dat.iserror))
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="agent-detail-outer">
      <div className='img-outer'>
        <div className="img-div" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        </div>
        <div className="content">
          <span>Agent Details</span>
          <ul>
            <li><a href="/"><AiOutlineHome size={20} className='changecolor' style={{ paddingBottom: "3px" }} /></a></li>
            <li>/</li>
            {/* <li><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></li> */}
            <li><span>Agent</span></li>
          </ul>
        </div>
      </div>
      <div className='agent-detail-wrapper'>
        <div className='container'>
          <div className="row">
            <div className="sidebar">
              <div className="content-outer">
                {agent_data !== null &&
                  <div className="agents-details">
                    <h3>Meet The Agent</h3>
                    <div className='agent-main'>
                      <div className="img">
                        <img src={agent_data.Imageurl} />
                      </div>
                      <div className="agent-name">
                        <p>{agent_data.Name}</p>
                      </div>

                    </div>
                    <div className="intro-area">
                      <p>
                        {agent_data.Description}
                      </p>

                    </div>
                    <form className="form" onSubmit={(e) => f(e)}>
                      <input className="input_areas" placeholder="Email Adress" value={form_data.user_email} onChange={(e) => (set_data(prev => ({ ...prev, user_email: e.target.value })))} />
                      <input className="input_areas" placeholder="Phone Number" type="text" value={form_data.mobile} required onChange={(e) => set_data(prev => ({ ...prev, mobile: e.target.value }))} />
                      <input className="input_areas" placeholder="Enter Message" value={form_data.message} onChange={(e) => set_data(prev => { return { ...prev, message: e.target.value } })} />
                      <center> <Button variant="primary" onClick={handleMessage}>Send Message</Button>{' '}</center>
                    </form>
                  </div>}
              </div>
            </div>
            <div className="recent-list">
              {agent_data !== null && <center><h3>Recent Listings By {capitalizeFirstLetter(agent_data.Name)}</h3></center>}
              <div className="recent-list-content">
                {agent_listing.length !== 0 ? (
                  agent_listing.map((ele, index) => (
                    <div style={{ width: "100%" }}>
                      <Agenttemplate agent={ele} key={index} isagent={true} is_blank={false} is_category={true} />
                    </div>))
                ) : (
                  <h1>hello</h1>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Agent_detail