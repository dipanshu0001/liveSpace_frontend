import React, { useState, useEffect } from 'react'
import { useAuthData } from '../DataProvider/AccountProvider'
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../Functions/FireBase-config'


function Admin_protect_route({ children }) {
    // const{details} =useAuthData();
    const auth = getAuth(app);
    const Navigate = useNavigate();
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
            if (user!==null) {
                if (user.displayName == "Admin") {
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
                else Navigate('/Admin-login')
            }
            else {
                // console.log("Not singed in till now ");
                Navigate('/Admin-login');
            }
        })
    }
    useEffect(() => {
        console.log("called")
        checkAuth();
        console.log(details, "protected")
    }, [])
    // console.log(details.uid);
    // if (details.uid === "") return <Navigate to="/login" replace />
    // else
    return children
}

export default Admin_protect_route