import React, { useState } from 'react'
import '../css/Login.css'
// import { L_r_button } from './Buttons'
import { SlSocialGoogle } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import Button from 'react-bootstrap/Button';
// import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { AiFillLock, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthData } from '../DataProvider/AccountProvider';
import { addDoc, getDoc, doc } from "firebase/firestore"
import { userRef } from '../firebase_database/model_ref';








function Login() {
    const { handlelogin_email, handlelogin_google, set_err, set_details, details } = useAuthData();
    const navigate = useNavigate();
    const [form_data, set_form] = useState({
        email: "",
        password: ""
    })
    const [isopen, setopen] = useState(false);
    const add_data = async (result) => {
        console.log(result);
        try {
            const isdata_present = await getDoc(doc(userRef, result.uid));
            if (!isdata_present.exists()) {
                const response = await addDoc(userRef,
                    {
                        displayName: result.displayName || '',
                        profileUrl: result.photoURL || '',
                        email: result.email,
                        uid: result.uid || '',
                    })
                // console.log(response.id)
            }
        } catch (e) { console.error(e) }
    }
    const toggleeye = () => {
        const password_type = document.getElementById('password');
        if (password_type.type == "password") {
            password_type.type = "text"
            setopen(true)
        }
        else {
            password_type.type = "password"
            setopen(false)
        }
    }
    const handlegooglelogin = () => {
        handlelogin_google().then(result => {
            set_details({
                accessToken: result.accessToken,
                displayName: result.displayName || '',
                profileUrl: result.photoURL || '',
                email: result.email,
                uid: result.uid,
                isloggedin: true
            })
            add_data(result);
            navigate('/')
        }).catch(err => set_err(err.message, err.iserror))
    }
    const handleSubmit = () => {
        const { email, password } = form_data;
        handlelogin_email(email, password)
            .then(result => {
                set_err(result.message, result.iserror)
                console.log(
                    result,
                    "email ka log "
                )
                set_form({ email: "", password: "" })
                set_details(prev => ({
                    ...prev,
                    accessToken: result.accessToken,
                    displayName: result.displayName || '',
                    profileUrl: result.photoURL || '',
                    email: result.email,
                    uid: result.uid,
                    isloggedin: true
                }))
                add_data(result);
                navigate('/');
            })
            .catch(err => set_err(err.message, err.iserror));
    }

    if (details.isLoggedIn) {
        return navigate('/');
    }

    return (
        <div className='login-outer'>
            <div className="login-main">
                <div className="login-content">
                    <div className="img-details">
                        <div className='main-img-div'>
                            <img src={require('../images/login_image.jpg')} />
                        </div>
                        <center className="create-account">
                            <a href="/Singup" >Create Account</a>
                        </center>


                    </div>
                    <div className="login-details">

                        <div>
                            <div className="input-section no-line"><span>Login</span></div>
                            <div className='input-section'>
                                <label><MdEmail /></label>
                                <input
                                    type="email"
                                    className='input'
                                    value={form_data.email}
                                    placeholder="Email"
                                    onChange={(e) => (set_form(prev => ({ ...prev, email: e.target.value })))}
                                >
                                </input>
                            </div>
                            <div className='input-section'>
                                <label><AiFillLock /></label>
                                <input
                                    className='input'
                                    type="password"
                                    value={form_data.password}
                                    placeholder="password"
                                    onChange={(e) => (set_form(prev => ({ ...prev, password: e.target.value })))}
                                    id="password"
                                />
                                {
                                    isopen ? <AiFillEye className="eye" size={30} onClick={toggleeye} /> : < AiFillEyeInvisible className='eye' size={30} onClick={toggleeye} />
                                }
                            </div>
                            {/* <div className='input-section checkbox'>
                                <input type="checkbox" className="checkbox-input" required />
                                <label>Remember me</label>
                            </div> */}
                            <center>
                                <Button as="a" variant="primary" style={{ alignItems: "center" }} onClick={handleSubmit}>
                                    Login
                                </Button>
                            </center>
                        </div>
                        <div className="login-other">
                            <ul>
                                <li><span>or Login with</span></li>
                                <li>
                                    <li>
                                        <a href="https://www.facebook.com/login/" target="_blank">
                                            <Button variant="primary">
                                                <FiFacebook className="fb" />
                                            </Button>
                                        </a>
                                    </li>

                                    <li>

                                        <Button variant="danger" onClick={handlegooglelogin}>
                                            <SlSocialGoogle className="twitter" />
                                        </Button>

                                    </li>
                                </li>

                            </ul>

                        </div>




                    </div>

                </div>


            </div>
        </div>

    )
}

export default React.memo(Login)

