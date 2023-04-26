import React from 'react'
// import { moredata } from '../databse/nav-bar-database'
import "../css/MoreListing.css"
import { Link, useNavigate } from 'react-router-dom'
function MoreListing({ heading, moredata }) {
    return (
        <div className="recent-list">
            <div className="main">
                <center><h2>{heading}</h2></center>
                {
                    moredata.map(
                        (ele, index) => (
                            <a href={`/See_details/${ele._id}`} replace key={index} className="detail-div">
                                <div className="img">
                                    <img src={ele.Thumbnail} />
                                </div>
                                <div className="other-details">
                                    <div className="link">{ele.Name}</div>
                                    <a>{ele.Price}/{ele.RentalPeriod}</a>
                                </div>
                            </a>
                        ))
                }

            </div>
        </div>
    )
}

export default MoreListing 