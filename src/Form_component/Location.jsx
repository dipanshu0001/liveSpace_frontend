import React, { useState } from 'react'
import './Basic_info.css'
import DisplayMap from '../component/DisplayMap'
import axios from 'axios'
import L_r_button from '../component/Buttons'
import { useData } from './FormContext'
// import axios from 'axios';

function Location() {
    
    const{formData,setformData,upload_data}=useData();
    const {Address,City,Pincode,State}=formData;
    // const [formData, setData] = useState({
    //     Address:"",
    //     City:"",
    //     Pincode:"",
    //     State:""
    // })
    const [coordinates, setcoordinates] = useState({
        lat: "28.62633056",
        long: "77.2185"
    })
    const set_form_data = (e) => {
        const { name, value } = e.target;
        if(name==="State"){
            console.log(name,value)
        }
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const get_coordinates = () => {
        // import axios from 'axios';
        // console.log("bulaya hai bro ise")
        const API_URL = '/https://atlas.mapmyindia.com/api/places/geocode';
        const API_KEY = 'af9228d8409c2ff6bc4a378fa6eae8a6';
        const address = '16 c block,sri ganganagar,Rajasthan';

        const encodedAddress = encodeURIComponent(address);

        axios.get(`https://thezipcodes.com/api/v1/search?zipCode=${formData.Pincode}&countryCode=IN&apiKey=${API_KEY}`)
            .then(response => {
                // console.log(response.data.location[0].latitude)
                // console.log(response.data.location[0].longitude)
                const {latitude,longitude} = response.data.location[0];
                setcoordinates({
                    lat:latitude,
                    long:longitude
                });
                setformData({...formData,Latitude:latitude,Longitutde:longitude});
                // const { latitude, longitude } = response.formData;
                // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const submit_form=async()=>{

        try{
            const data=await upload_data();
            console.log(data);
            
        }catch(error){console.log(error);}
    }

    return (
        <div className="basic-outer">
            <div className="basic-main">
                <div className="display-map">
                    <DisplayMap lat={coordinates.lat} long={coordinates.long} />
                </div>
                <div>
                    <div className="basic-inputs">
                        <label htmlfor="address">Full Address</label>
                        <input
                            type="text"
                            placeholder='Address'
                            name="Address"
                            value={formData.Address}
                            onChange={set_form_data}

                        />
                        
                    </div>
                    <div className="basic-inputs">
                        <label for="city">City</label>
                        <input
                            type="text"
                            name="City"
                            placeholder='City'
                            value={formData.City}
                            onChange={set_form_data}
                        />
                    </div>
                    <div className="basic-inputs">
                        <label for="Pincode">Pincode</label>
                        <input
                            type="text"
                            name="Pincode"
                            placeholder='Pincode'
                            value={formData.Pincode}
                            onChange={set_form_data} 
                                onBlur={get_coordinates}
                            />
                    </div>
                    <div className="basic-inputs">
                        <label for="State">State</label>
                        <input
                            name="State"
                            placeholder='State'
                            value={formData.State}
                            onChange={set_form_data}
                            // onChange={set_form_data}
                             />
                    </div>
                {/* <button onClick={submit_form}>Submit</button> */}
                    

                </div>


            </div>

        </div>
    )
}

export default Location