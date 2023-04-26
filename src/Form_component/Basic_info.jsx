import React, { useState } from 'react'
import './Basic_info.css'
import {useData} from './FormContext'
function Basic_info() {
  const{formData,setformData}=useData();
  // const [formData, setData] = useState({
  //   Description:"",
  //   Name:"",
  //   Status:"",
  //   Type:"",
  //   Price:"",
  //   RentalPeriod:"",
  //   Space:""
  // })
  console.log(formData);
  const set_form_data = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  // console.log(formData);
  return (
    <div className="basic-outer">
      <div className="basic-main">

        <div className="basic-input">
          <label htmlfor="Description">Description</label>
          <textarea
            type="text"
            placeholder='Property Description'
            rows={3}
            name="Description"
            value={formData.Description}
            onChange={set_form_data}
          />
        </div>
        <div className="basic-inputs">
          <label for="Description">Property Name</label>
          <input
            type="text"
            placeholder='Property Name'
            name="Name"
            value={formData.Name}
            onChange={set_form_data}
          />
        </div>
        <div className="basic-inputs">
          <label for="Description">Property Status</label>
          <select
            name="Status"
            value={formData.Status}
            onChange={set_form_data}>
            <option value="Rent" default>Rent</option>
            <option value="for sale">For Sale</option>
            <option value="Leased">Leased</option>
            <option value="sold">Sold</option>
            <option value="rental">Rental</option>
          </select>
        </div>
        <div className="basic-inputs">
          <label for="Description">Property Type</label>
          <select
            type="text"
            name="Type"
            value={formData.Type}
            onChange={set_form_data}>
            <option value="House" Default>House</option>
            <option value="Apartment" >Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Duplex">Duplex</option>
          </select>
        </div>
        <div className="basic-inputs">
          <label for="PropertyPrice">Property Price </label>
          <input
            name="Price"
            placeholder='Price'
            value={formData.Price}
            onChange={set_form_data} />
        </div>
        <div className="basic-inputs">
          <label for="PropertyPeriod">Property Period</label>
          <select
            type="text"
            name="RentalPeriod"
            value={formData.RentalPeriod}
            onChange={set_form_data}>
            <option value="Yearly" default>Yearly</option>
            <option value="Monthly" >Monthly</option>
          </select>
        </div>
        <div className="basic-inputs">
          <label htmlfor="Size">Property Size</label>
          <input
            name="Size"
            placeholder='Size'
            value={formData.Size}
            onChange={set_form_data} />
        </div>
      </div>

    </div>
  )
}

export default Basic_info
