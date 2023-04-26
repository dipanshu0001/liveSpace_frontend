import React, { useState } from 'react'
import L_r_button from '../component/Buttons'
import backgroundImage from '../images/agent-bg.jpg'
import './form.css'
import Basic_info from './Basic_info'
import Gallery from './Gallery'
import Location from './Location'
import Details from './Details'
import FormContext from './FormContext'
function Form() {
    const [type, setType] = useState(1);
    // console.log(type);
    return (
        <FormContext>
<div className="form-outer" >
            <div className='form-main'>
                <div className='img-outer'>
                    <div className="img-div" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                    </div>
                    <div className="content">
                        <span>Submit Listing</span>
                    </div>
                </div>
                <div className='btn-section'>
                    <ul className="btn-details">
                        <li onClick={() => setType(1)} >
                            <button className={type == 1 ? "btns button-color" : "btns"}>
                                <div className='serial-number'>01</div>
                                <div>Basic Information</div>
                            </button>
                        </li>

                        <li onClick={() => setType(2)} >
                            <button className={type == 2 ? "btns button-color" : "btns"}>
                                <div className='serial-number'>02</div>
                                <div>Gallery</div>
                            </button>

                        </li>
                        <li onClick={() => setType(3)} >
                            <button className={type == 3 ? "btns button-color" : "btns"}>
                                <div className='serial-number'>03</div>
                                <div>Location</div>
                            </button>
                        </li>
                        <li onClick={() => setType(4)} >
                            <button className={type == 4 ? "btns button-color" : "btns"}>
                                <div className='serial-number'>04</div>
                                <div>Details</div>
                            </button>
                        </li>
                    </ul>
                    <div className='form-display'>
                        {type == 1 && <Basic_info />}
                        {type == 2 && <Gallery />}
                        {type == 3 && <Location />}
                        {type == 4 && <Details />}
                    </div>
                </div>

            </div>
        </div>
        </FormContext>
        
    )
}
export default Form
