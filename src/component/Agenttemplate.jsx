import React, { useState, useEffect, memo } from 'react'
import '../css/Agenttemplate.css'
import '../css/TopListingTemp.css'
// import { data } from '../databse/agentdata'
import Button from 'react-bootstrap/Button';
import L_r_button from './Buttons'
import { BsThreeDotsVertical, BsTelephone, BsFillBookmarkFill } from "react-icons/bs";
import { BiMessageAltDetail } from "react-icons/bi";
import { CiRuler } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import Badge from 'react-bootstrap/Badge';
import { Outlet } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { GrFormView} from "react-icons/gr";


function Agenttemplate({ agent, isagent, is_category, is_schedule, handleCancel, Done, Tour_id }) {
  const [clicked, setClicked] = useState(false);
  const [agent_data, setdata] = useState({});
  useEffect(() => {
    const get_data = async () => {

      try {
        const response = await axios.post("https://backend-livespace.onrender.com/Agents/GetAgent", { uid: agent.Agent_uid });
        // console.log(response.data);
        setdata(prev => ({ ...response.data }))
      } catch (e) { console.log(e.message, "error while fetching agent data for agent template") }
    }
    get_data();
    // console.log(agent_data)
  }, [])

  return (
    <div className={isagent ? "agent-outer  listing_content" : "top-list-outer"}>
      <div className={isagent ? "agent-main" : "top-list-main"}>
        {
          !isagent
            ? (<div className="top-list-bg-img-outer"><img src={agent.Thumbnail} className="top-list-bg-img" /></div>)
            : (<div className="bckimg">
              {/* <a href="#"> */}
              <img src={agent.Thumbnail} />
              {/* </a> */}
              <div className="pending">
                {agent.Pending && <Badge bg="danger" className="p_btn">
                  Pending
                </Badge>}
                {agent.Sale && <Badge bg="success" className="p_btn">
                  on Sale
                </Badge>}
              </div>
            </div>)
        }

        <div className={isagent ? "content" : "top-list-content"}>
          {
            !is_category && <div className="agent-div">
              <div className="agent-img">
                <img src={agent_data.Imageurl} />
              </div>
              <div className="agent-detail-button">
                <div className="agent-detail">
                  <span className="small-heading">{agent.Name}</span>
                  {/* <span className="grey-text">16-jun-2001</span> */}
                </div>
                <div className="outer-drop-down" onClick={() => { setClicked(prev => !prev) }}>
                  <BsThreeDotsVertical />
                  {
                    clicked && (<div className="drop-down">
                      <ul>
                        <li className="agent-d blue"><a href={`Agent_details/${agent_data.uid}`}><GrFormView size={40} /><span className='small-icon-drop'>View Agent</span></a></li>
                        <hr />
                        <li className="agent-d blue"><a href="#message-form"><BiMessageAltDetail size={35} /><span className='small-icon-drop'>Send Message</span></a></li>
                        <hr />
                        <li className="agent-d blue"><a><BsFillBookmarkFill /><span className='small-icon-drop'>Book Listing</span></a></li>
                      </ul>
                    </div>)
                  }

                </div>
              </div>
            </div>
          }

          <h4 className="location x-small-heading">{agent.Address},{agent.City}</h4>
          {/* location details */}
          <span className="price">
            <span className='blue-text'>{agent.Price}</span>
            <span className='grey-text'>/{agent.RentalPeriod}</span>
          </span>
          {/* price details */}
          <p className="text">{agent.Description}</p>
          {/* text details */}
          {/* beds details */}
          <div className="other-detail">
            <span className="details-extra"><span><BiBed /></span><span>{agent.Beds}</span></span>
            <span className="details-extra"><span><GiBathtub /></span><span>{agent.Bath}</span></span>
            <span className="details-extra"><span><CiRuler /></span><span>{agent.Size}</span></span>
          </div>
          {!isagent && (<div className="button-footer">
            <L_r_button data="view Details" Where_to={`See_details/${agent._id}`} is_blank={false} />
            {/* <i></i> */}
          </div>)}
        </div>
        {
          isagent && (
            <center className="button-footer">
              {!is_schedule ? (
                <a href={`/See_details/${agent._id}`}><Button variant="primary">View Details</Button>{' '}</a>)
                : (
                  <Button class="btn btn-danger" variant='danger' disabled={Done} onClick={() => handleCancel(Tour_id)}>{!Done ? "Cancel Tour" : "All ready visited"}</Button>
                )
              }
            </center>)
        }

      </div>
      <Outlet />
    </div>
  )
}

export default memo(Agenttemplate)