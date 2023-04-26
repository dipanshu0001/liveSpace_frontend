import React, { useState, useEffect } from 'react'
import "../css/Property_details.css"
import { BsThreeDotsVertical, BsTelephone, BsFillBookmarkFill, BsWindowSidebar } from "react-icons/bs";
import { BiMessageAltDetail } from "react-icons/bi";
import { data_value } from '../databse/database'
import { navbarImage } from '../databse/nav-bar-database'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { data } from '../databse/agentdata'
import DisplayMap from './DisplayMap'
import L_r_button from './Buttons';
import MoreListing from './MoreListing';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useAuthData } from '../DataProvider/AccountProvider'
import { useNavigate } from 'react-router-dom';
import { GrFormView} from "react-icons/gr";

function Property_details({ detail_data }) {
    const navigate=useNavigate();
    const { details, set_err } = useAuthData();
    const [agent_data, setdata] = useState({})
    const [clicked, setClicked] = useState(false);
    const [moredata, setmoredata] = useState([]);
    const [form_data, set_data] = useState({
        user_email: "",
        mobile: "",
        message: ""
    });
    const [tour_data, set_Tour_Data] = useState({
        Name: "",
        Email: "",
        Phone: "",
        S_Date: "",
        Comment: ""
    });
    const get_data = async () => {
        try {
            const data = await axios.post('https://backend-livespace.onrender.com/Listings/LimitedDisplay', { quantity: 6 });
            // console.log(data);

            setmoredata(prev => ([...data.data]));
        } catch (e) { console.log(e.message) }
    }

    const get_agent = async () => {
        try {
            const response_data = await axios.post("https://backend-livespace.onrender.com/Agents/GetAgent", { uid: detail_data.Agent_uid })
            // console.log(response_data.data);
            setdata(prev => ({ ...response_data.data }));
        } catch (e) { console.log(e.message) }

    }
    const f = (e) => {
        e.preventDefault();
        // console.log(form_data);


    }
    const change_tour = (e) => {
        e.preventDefault();
        console.log(tour_data);
        set_Tour_Data({
            name: "",
            email: "",
            phone: "",
            date: "",
            comment: ""
        })

    }

    const handleMessage = () => {
        if(!details.isloggedin) navigate('/Login')
        axios.post("/Agents/SendEmail", { ...form_data, agent_email: agent_data.Gmail, agnt_name: agent_data.Name })
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
    const handleTour = async () => {
        if(!details.isloggedin) navigate('/Login')

        try {
            const result = await axios.post('/Tours/ScheduleTour', {
                ...tour_data,
                Listing_id: detail_data._id,
                User_uid: details.uid,
                Agent_uid: detail_data.Agent_uid
            })
            // console.log(result)
            set_err(result.data.message, result.data.iserror)
            set_Tour_Data({
                Name: "",
                Email: "",
                Phone: "",
                S_Date: "",
                Comment: ""
            })
            // console.log(result);
        } catch (err) {
            set_err(err.message, err.iserror)
        }
    }
    useEffect(() => {
        setdata(detail_data);
        get_data();
        get_agent();
    }, [detail_data])



    return (
        <div className="property-details-outer">
            <div className="property-details-main">
                <div className="left-main">
                    <div className="details">
                        <h3>
                            <span>Property Overview</span></h3>
                        <p>
                            {detail_data.Description}
                        </p>
                    </div>
                    <div className="images-div">
                        {
                            detail_data.Images.map((image, index) => (
                                <div className="image" key={index}>
                                    <img src={image} key={index} className="main-img" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="range">
                        <span className="value">{detail_data.Price}</span>
                        <ProgressBar variant='info' now={50} min={0} max={100} />
                        <div className="range-value">
                            <div className="low">
                                <h6>{detail_data.lowest}</h6>
                                <p>Lowest</p>
                            </div>
                            <div className="middle"><h5>Price range in the area</h5></div>
                            <div className="high">
                                <h6>{detail_data.highest}</h6>
                                <p>Highest</p>
                            </div>
                        </div>


                    </div>
                    <div className='nearby'>
                        <div className="n-1">
                            <h5 style={{ color: "#30ca71" }}>Restaurents</h5>
                            <ul>
                                {
                                    data_value.restaurent.map((ele, index) => (
                                        <li key={index}>
                                            <div className="details"><p>{ele.name}</p><span>({ele.distance})</span></div>
                                            <div className="star">

                                                <span>star Rating</span>
                                            </div>

                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="n-1">
                            <h5 style={{ color: "#ff4764" }}>Education</h5>
                            <ul>
                                {
                                    data_value.education.map((ele, index) => (
                                        <li key={index}>
                                            <div className="details"><p>{ele.name}</p><span>({ele.distance})</span></div>
                                            <div className="star">
                                                <span>star Rating</span>
                                            </div>

                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="n-1">
                            <h5 style={{ color: "#ffa80a" }}>Essential</h5>
                            <ul>
                                {
                                    data_value.essential.map((ele, index) => (
                                        <li key={index}>
                                            <div className="details"><p>{ele.name}</p><span>({ele.distance})</span></div>
                                            <div className="star">
                                                <span>star Rating</span>
                                            </div>

                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>


                    <div className="tour_form">
                        <center><h4>Sechdule Tour </h4></center>
                        <form className="form" onSubmit={change_tour}>
                            <div className="input_div">
                                <input placeholder="Full Name" className='input_areas' type="text" value={tour_data.Name} onChange={(e) => (set_Tour_Data(prev => ({ ...prev, Name: e.target.value })))} />
                                <input placeholder="Email Address" className='input_areas' type="email" value={tour_data.Email} onChange={(e) => (set_Tour_Data(prev => ({ ...prev, Email: e.target.value })))} />
                                <input placeholder="Phone number" type="number" className='input_areas' value={tour_data.Phone} onChange={(e) => (set_Tour_Data(prev => ({ ...prev, Phone: e.target.value })))} />
                                <input placeholder="Date" type="date" className='input_areas' value={tour_data.S_Date} onChange={(e) => (set_Tour_Data(prev => ({ ...prev, S_Date: e.target.value })))} />
                            </div>

                            <textarea rows="8" cols="5" className=" input_div textarea_div" placeholder="comments" value={tour_data.Comment} onChange={(e) => (set_Tour_Data(prev => ({ ...prev, Comment: e.target.value })))} />
                        </form>
                        {/* <L_r_button data="Schedule Tour" is_blank={true} />
                         */}
                        <center>
                            <Button onClick={handleTour}>Schedule Tours</Button>
                        </center>

                    </div>
                </div>
                <div className="right-main">
                    <div className="right_sticky">
                        <div className="agents-details">
                            <h3>Meet The Agent</h3>
                            <div className='agent-main'>
                                <div className="img">
                                    <img src={agent_data.Imageurl} />
                                </div>
                                <div className="agent-name">
                                    <p>{agent_data.Name}</p>
                                </div>
                                <div className="outer-drop-down" onClick={() => { setClicked(prev => !prev) }}>
                                    <BsThreeDotsVertical style={{ margin: "auto", marginBottom: "5px" }} />
                                    {
                                        clicked && (<div className="drop-down">
                                            <ul>
                                                <li className="agent-d blue"><a href={`Agent_details/${agent_data.uid}`}><GrFormView size={40}/><span className='small-icon-drop'>View Agent</span></a></li>
                                                <hr />
                                                <li className="agent-d blue"><a href="#message-form"><BiMessageAltDetail size={40}/><span className='small-icon-drop'>Send Message</span></a></li>
                                                <hr />
                                                <li className="agent-d blue"><a><BsFillBookmarkFill /><span className='small-icon-drop'>Book Listing</span></a></li>
                                            </ul>
                                        </div>)
                                    }

                                </div>


                            </div>
                            <form className="form" onSubmit={(e) => f(e)} id="message-form">
                                <input className="input_areas" placeholder="Email Adress" value={form_data.user_email} onChange={(e) => (set_data(prev => ({ ...prev, user_email: e.target.value })))} />
                                <input className="input_areas" placeholder="Phone Number" type="text" value={form_data.mobile} required onChange={(e) => set_data(prev => ({ ...prev, mobile: e.target.value }))} />
                                <textarea className="input_areas" placeholder="Enter Message" value={form_data.message} onChange={(e) => set_data(prev => { return { ...prev, message: e.target.value } })} />
                                <center> <Button variant="primary" onClick={handleMessage}>Send Message</Button>{' '}</center>
                            </form>
                        </div>
                        <div className='location'>
                            <DisplayMap lat={detail_data.Latitude} long={detail_data.Longitutde} />
                        </div>
                        <MoreListing heading="More Listings" moredata={moredata} />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Property_details