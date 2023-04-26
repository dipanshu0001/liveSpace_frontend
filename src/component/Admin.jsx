import React, { useState } from 'react'
import '../css/Profile.css'
import { Link } from 'react-router-dom'
import AllListing from './AllListing.jsx'
import ScheduledTour from './ScheduledTour.jsx'
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";
import Aside from './Aside'
import { ImCross } from "react-icons/im";
import { Profile_data } from '../databse/Profile_database'
import AllAgent from './AllAgent.jsx'
import AllTour from './AllTour.jsx'
import { auth } from '../Functions/FireBase-config'
import { useNavigate } from 'react-router-dom'

import { useAuthData } from '../DataProvider/AccountProvider';






function Admin() {
    const [value, setValue] = useState(1);
    const Navigate=useNavigate()
    const [isres, setres] = useState(true);
    const {set_details } = useAuthData();

    
    const handleLogout = () => {
        auth.signOut().then(() => {
            // console.log('logged out successfully')
            set_details({
                accessToken: "",
                displayName: "",
                profileUrl: "",
                email: "",
                islogged_in: false,
            });
            Navigate('/Admin');
            window.location.reload();
        }).catch(err => console.log(err.message))
    }
    return (
        <>
            <div className={isres ? "aside-display aside-hidden" : "aside-display aside-show"}>
                <div className="heading-mob">
                    <span>
                        Pages
                    </span>
                    <ImCross size={15} onClick={() => setres(true)} />
                </div>
                {/* <Aside value={value} setValue={setValue} Profile_data={Profile_data}/> */}
                <div className="aside-scroll">
                    <ul>
                        <li onClick={() => setValue(1)}>
                            <Link>
                                <i class="fa-sharp fa-regular fa-file-lines icon"></i>
                                All Pending Listings
                            </Link>
                        </li>
                        <li onClick={() => setValue(2)}>
                            <Link>
                                <i class="fa-regular fa-clock icon"></i>
                                All Agents
                            </Link>
                        </li>
                        <li onClick={() => setValue(3)}>
                            <Link>
                                <i class="fa-regular fa-clock icon"></i>
                                ALL Schdule Tours
                            </Link>
                        </li>
                        <li onClick={handleLogout}>
                            <Link>
                                <i class="fa-regular fa-clock icon"></i>
                                Logout
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>

            <div className='profile-outer'>



                <div className="display-ham">
                    <GoThreeBars onClick={() => { setres(false); console.log("called") }} size={30} />
                </div>
                <div className="profile-main">
                    <div className="profile-sidebar">
                        <div className="heading-mob">Pages </div>
                        <div className="aside-scroll">
                            <ul>
                                <li onClick={() => setValue(1)}>
                                    <Link>
                                        <i class="fa-sharp fa-regular fa-file-lines icon"></i>
                                        All Pending Listings
                                    </Link>
                                </li>
                                <li onClick={() => setValue(2)}>
                                    <Link>
                                        <i class="fa-regular fa-clock icon"></i>
                                        All Agents
                                    </Link>
                                </li>
                                <li onClick={() => setValue(3)}>
                                    <Link>
                                        <i class="fa-regular fa-clock icon"></i>
                                        ALL Tours
                                    </Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <Link>
                                    <i class="fa-solid fa-right-from-bracket icon"></i>                                        Logout
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className="profile-display">
                        {value == 1 && (
                            <>
                                <center><h3>ALL Pending Listings</h3></center>
                                <AllListing />
                            </>
                        )}
                        {value == 2 && (
                            <>
                                <center><h3>All Agents</h3></center>
                                <AllAgent />
                            </>
                        )}
                        {value == 3 && (
                            <>
                                <center><h3>All</h3></center>
                                <AllTour />
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin