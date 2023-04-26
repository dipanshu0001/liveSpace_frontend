import React, { createContext, useState, lazy, Suspense, useEffect } from 'react';
import Meetagent from './Meetagent';
import Agentprofile from './Agentprofile';
import Footer from './Footer';
import { navbarImage } from '../databse/nav-bar-database'
import Loading from './Loading';
import axios from 'axios';
import Loader from '../media/Loader'


// import SignUp from './SignUp';
// import Login from './Login';





const Behindnavbar = lazy(() => import('./Behindnavbar'));
const Recentlisting = lazy(() => import('./Recentlisting'));
const Testimonial = lazy(() => import('./Testimonial'));
const Toplisting = lazy(() => import('./Toplisting'));
const Categories = lazy(() => import('./Categories'));
function Home() {
  const [sample, setNavbar] = useState([]);
  const get_data = () => {
    // try{
    axios.post("https://backend-livespace.onrender.com/Listings/LimitedDisplay")
      .then(data => { setNavbar(prev => ([...prev, ...data.data]));})
      .catch(err => console.log(err));
  }
  useEffect(() => {
    if (sample.length === 0) {
      get_data();
    }
  }, [])
  return (
    <>
    {sample.length>0?(<>
      <Behindnavbar details="See details" is_details={false} sample={sample} />
      <Categories />
      <Recentlisting />
      <Toplisting />
      <Meetagent />
      <Testimonial /></>):<Loader/>
    }
    </>
  )
}

export default Home