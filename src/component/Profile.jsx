import React, { useState } from 'react'
import '../css/Profile.css'
import { Link } from 'react-router-dom'
import SubmitedListing from './SubmitedListing.jsx'
import ScheduledTour from './ScheduledTour.jsx'
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";
import Aside from './Aside'
import { ImCross } from "react-icons/im";
import {Profile_data} from '../databse/Profile_database'






function Profile() {
    const [value, setValue] = useState(1);
    const [isres, setres] = useState(true);
    console.log(isres)
    return (
        <>
            <div className={isres ? "aside-display aside-hidden" : "aside-display aside-show"}>
                <div className="heading-mob">
                    <span>
                        Pages
                    </span>
                    <ImCross size={15} onClick={() => setres(true)} />
                </div>
                <Aside value={value} setValue={setValue} Profile_data={Profile_data}/>
            </div>

            <div className='profile-outer'>



                <div className="display-ham">
                    <GoThreeBars onClick={() => { setres(false); console.log("called") }} size={30} />
                </div>
                <div className="profile-main">
                    <div className="profile-sidebar">
                        <div className="heading-mob">Pages </div>
                        <Aside value={value} setValue={setValue} Profile_data={Profile_data}/>
                    </div>
                    <div className="profile-display">
                        {value == 1 && (
                            <>
                                <center><h3>Submited Listings</h3></center>
                                <SubmitedListing />
                            </>
                        )}
                        {value == 2 && (
                            <>
                                <center><h3>Scheduled Tours</h3></center>
                                <ScheduledTour />
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile