import React, { useState } from 'react'
import { useAuthData } from '../DataProvider/AccountProvider';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import Button from 'react-bootstrap/Button';
// import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import {AiFillLock, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";




function Admin_login_form() {
    const { handlelogin_email, handlelogin_google, set_err, set_details, details } = useAuthData();
    const navigate = useNavigate();
    const [form_data, set_form] = useState({
        email: "",
        password: ""
    })
    const [isopen, setopen] = useState(false);

    const handleSubmit = () => {
        const { email, password } = form_data;
        handlelogin_email(email, password)
            .then(result => {
                // set_err(result.message, result.iserror)
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
                // add_data(result);
                navigate('/Admin');
            })
            .catch(err => set_err(err.message, err.iserror));
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
    return (
        <>
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
                    <div className='input-section checkbox'>
                        <input type="checkbox" className="checkbox-input" required />
                        <label>Remember me</label>

                    </div>
                    <Button as="a" variant="primary" style={{ alignItems: "center" }} onClick={handleSubmit}>
                        Login
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Admin_login_form