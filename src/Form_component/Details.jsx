import React from 'react'
import './Basic_info.css'
import { useData } from './FormContext'
import Button from 'react-bootstrap/Button';



function Details() {
    const { formData, setformData, upload_data } = useData();
    // console.log({ ...formData }, "formData")
    const set_form_data = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.name);
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const submit_form = async () => {

        try {
            const data = await upload_data();
            // console.log(data);

        } catch (error) { console.log(error); }
    }

    return (
        <div className="basic-outer">
            <div className="basic-main">
                <div className="basic-inputs view-input">
                    <label for="PropertyPeriod">View</label>
                    <select
                        type="text"
                        name="View"
                        value={formData.propertyPeriod}
                        onChange={set_form_data}>
                        <option value="City" default>City</option>
                        <option value="Park" >Park</option>
                        <option value="Beach" default>Beach</option>
                        <option value="Mountain" >Mountain</option>
                    </select>
                </div>
                <div className="basic-inputs">
                    <label for="Description">Beds</label>
                    <input
                        type="text"
                        name="Beds"
                        placeholder="Number of Beds"
                        value={formData.Beds}
                        onChange={set_form_data}
                    />
                </div>
                <div className="basic-inputs">
                    <label for="Description">Bathrooms</label>
                    <input
                        type="text"
                        name="Bath"
                        placeholder="Number of Bathrooms"
                        value={formData.Bath}
                        onChange={set_form_data}
                    />
                </div>
                <div className="basic-inputs">
                    <label for="Description">Condition</label>
                    <input
                        type="text"
                        name="Condition"
                        placeholder="Property Condition"
                        value={formData.Condition}
                        onChange={set_form_data}
                    />
                </div>
                <div className="basic-inputs">
                    <label for="PropertyPrice">Year Build </label>
                    <input
                        name="Year_Build"
                        placeholder='Year Build'
                        value={formData.Year_Build}
                        onChange={set_form_data} />
                </div>
                <center className="view-input">                      
                <Button variant="primary"  onClick ={submit_form}>Submit</Button>{' '}

                </center>

            </div>

        </div>
    )
}

export default Details