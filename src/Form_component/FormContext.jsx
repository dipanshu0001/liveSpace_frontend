import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import {useAuthData} from '../DataProvider/AccountProvider'


export const DataContext = createContext(null);



function FormContext({ children }) {
  const{details,set_err} =useAuthData();
  const [formData, setformData] = useState({
    Description: "",
    Name: "",
    Status: "",
    Type: "",
    Price: "",
    RentalPeriod: "",
    Size:"",
    Thumbnail: "",
    Images: [],
    Address: "",
    City: "",
    Pincode: "",
    State: "",
    Latitude: 0,Size: "",
    Longitude: 0,
    Beds: "",
    Bath: "",
    Condition: "",
    Year_Build: "",
    View:""
  })
  React.useEffect(() => {
    // console.log(formData)
  }, [formData])
  const upload_data = () => {
  // console.log(details,formData);

    axios.post("https://backend-livespace.onrender.com  /Listings/AddDetails", { ...formData,...details })
      .then(response => set_err(response.data.message,1))
      .catch(error => {
        // console.log(error.data.message)
        // console.log(error.response.data.message)
        set_err(error.response.data.message,3)
      })
    // console.log("called");

  }
  return (
    <DataContext.Provider value={{ formData, setformData, upload_data }}>
      {children}
    </DataContext.Provider>

  )
}
export const useData = () => useContext(DataContext);
export default FormContext