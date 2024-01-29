import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import Behindnavbar from './Behindnavbar'
import Navbar from './Navbar'
import { navbarImage } from '../databse/nav-bar-database'
import { GiWhirlwind } from 'react-icons/gi'
import axios from 'axios'
// import Property_details from './Property_details'
const Property_details = lazy(() => import("./Property_details"))
// import { sidebar_isclicked } from './Home'
function See_details() {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState(null);

  const get_data = async () => {
    try {
      const particular_data = await axios.post(`http://localhost:4000/Listings/GetParticular`, { id: id })
      // console.log({ ...particular_data.data.Listing_data[0]});
      if (particular_data.data.Listing_data.length > 0) {
        setData(prev=>({ ...particular_data.data.Listing_data}));
      }
      else {
        console.log("object is empty");
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  useEffect(() => {
    get_data();
    // console.log(data);
  }, [])
  return (
    <>

      {data !== null &&
        <>
          <Behindnavbar sample={data} details="Printing Deatils" is_details={true} />
          <Suspense fallback={<h4>Loading ....</h4>}>
            <Property_details detail_data={data[0]} />
            {/* <Property_details detail_data={navbarImage[id-1]}/> */}
          </Suspense>
        </>

      }
    </>
  )
}
//  things to add in see details:->
//  1. navbar compelete ✔️
//  2. details page behind nav bar same just changer kerna data ✔️
//  3. property over-view ✔️
//  4. price range bhi add ker dena hai of bi-house
//  5. features add kerna house mai kya kya hai❌
//  6. schedule Tour peh toh seedha route kerndege simple
//  7. similar listing deekha dio ager ho ske toh
//  8. Meet the agent wala component idher bhi lagana
export default See_details