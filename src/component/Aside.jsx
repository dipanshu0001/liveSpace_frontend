import React from 'react'
import { Link } from 'react-router-dom'

function Aside({ value, setValue, Profile_data }) {
    return (
        <div className="aside-scroll">
            <ul>
                {
                    Profile_data.map((ele, index) => {
                       return  <li>
                            <Link to={ele.link_to}>
                                <i className={ele.icon_class}></i>
                                {ele.name}
                            </Link>
                        </li>
                    })
                }
                <li onClick={() => setValue(1)}>
                    <Link>
                        {/* <i className="icon fa-regular fa-memo"></i> */}
                        <i class="fa-sharp fa-regular fa-file-lines icon"></i>
                        Submited Listings
                    </Link>
                </li>
                <li onClick={() => setValue(2)}>
                    <Link>
                        <i class="fa-regular fa-clock icon"></i>
                        Scheduled Tours
                    </Link>
                </li>
            </ul>

        </div>
    )
}

export default Aside