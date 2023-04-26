import React, { useState, useEffect } from 'react'
import { useAuthData } from '../DataProvider/AccountProvider'
import { Navigate,useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../Functions/FireBase-config'


function Protected_route({ children }) {
  // const{details} =useAuthData();
  const auth = getAuth(app);
  const Navigate=useNavigate();
  const [details, set_details] = useState({
    accessToken: "",
    displayName: "",
    profileUrl: "",
    email: "",
    uid: "",
    isloggedin: false,
  })
  const checkAuth = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        console.log(user)
        set_details({
          accessToken: user.accessToken,
          displayName: user.displayName || '',
          profileUrl: user.photoURL || '',
          email: user.email,
          isloggedin: true,
          uid: user.uid
        })

      }
      else {
        // console.log("Not singed in till now ");
        Navigate('/Login')
      }
    })
  }
  useEffect(() => {
    checkAuth();
  }, [])
  // console.log(details.uid);
  // if (details.uid === "") return <Navigate to="/login" replace />
  // else
    return children
}

export default Protected_route