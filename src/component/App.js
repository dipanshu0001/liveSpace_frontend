import react, { createRef, useRef } from 'react';
import '../css/App.css';
import Home from './Home'
import Listing from './Listings'
import Agents from './Agents'
import See_details from './See_details'
import { Routes, Route } from "react-router-dom"
import Listings from './Listings';
import Form from '../Form_component/Form';
import Display_categories from './Display_categories'
import Agent_details from './Agent_detail'
import Not_found from './Not_found'
import All_feedback from './All_feedback';
import ToplistingTemplate from './ToplistingTemplate';
import Login from './Login';
import SignUp from './SignUp';
import Footer from './Footer';
import Profile from './Profile.jsx';
import WithNavbar from './WithNavbar';
import WithoutNavbar from './WithoutNavbar';
import { ToastContainer } from 'react-toastify';
import DataProvider from '../DataProvider/DataProvider';
import AccountProvider from '../DataProvider/AccountProvider';
import Protected_route from './Protected_route';
import Behindnavbar from './Behindnavbar';
import Admin from './Admin';
import Admin_login_form from './Admin_login_form';
import Admin_protect_route from './Admin_protect_route';
// import Not_found from './Not_found';

// export const toastRef=createRef(null);
function App() {
  // React.useEffect(()=>{console.log(is_clicked)},[is_clicked])
  return (
    <>

      <AccountProvider>
        <ToastContainer />
        <DataProvider>
          <Routes>
            <Route element={<WithoutNavbar />}>
              <Route path="/Login" element={<Login />} />
              <Route path="/Singup" element={<SignUp />} />\
              <Route path="/Admin-login" element={<Admin_login_form/>}/>
              <Route path="/Profile" element={
                <Protected_route>
                  <Profile />
                </Protected_route>
              } />
              <Route path="/Admin" element={
                <Admin_protect_route>
                  <Admin />
                </Admin_protect_route>
              } />
            </Route>
            <Route element={<WithNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/Agents" element={<Agents />} />
              <Route path="/Listing" element={<Listing />} >
                {/* <Route path="*" element={<Not_found />} /> */}
              </Route>
              <Route path="/Form" element={
                <Protected_route>
                  <Form />
                </Protected_route>
              } />

              <Route path="/categories/" element={<Display_categories />} />
              <Route path="/categories/:category" element={<Display_categories />} />
              <Route path="/See_details/:id" element={<See_details />} />
              <Route path="/Agent_details/:id" element={<Agent_details />} />
              <Route path="/All_feedback/" element={<All_feedback />} />
              <Route path='/*' element={<Not_found/>}/>
            </Route>
          </Routes>
          {/* <Footer /> */}
        </DataProvider>
      </AccountProvider>
    </>


  )
}

export default App
