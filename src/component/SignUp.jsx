import React, { useState } from 'react'
import '../css/Signup.css'
import '../css/Login.css'
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { CiLight, CiLock } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import { AiOutlineUser, AiFillLock, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthData } from '../DataProvider/AccountProvider';
import axios from 'axios';


function SignUp() {
    let navigate = useNavigate();
    const { handleSingup_email, set_err, details } = useAuthData();
    const [isagent, setagent] = useState(false);
    const [form_data, set_form] = useState({
        email: "",
        password: "",
        confirm_password: "",
        name: ""
    })
    const [file, setfile] = useState(null);
    const [isopen, setopen] = useState(false)
    const [isopenconfirm, setopenconfirm] = useState(false)

    const toggleeye = (e) => {
        const password_type = document.getElementById(e);
        if (password_type.type == "password") {
            password_type.type = "text"
            if (e == "password")
                setopen(true)
            else setopenconfirm(true)
        }
        else {
            password_type.type = "password"
            if (e == "password")
                setopen(false)
            else setopenconfirm(false)
        }
    }
    const upload_image = async (filed) => {
        // console.log(filed)
        const formData = new FormData();
        formData.append("file", filed);
        formData.append("upload_preset", "Listing_images");
        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dxbo7f16e/image/upload',
                {
                    method: 'POST',
                    body: formData,
                    mode: 'cors',
                }
            );
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            const data = await response.json();
            // console.log(data.url);
            return data.secure_url;
        } catch (error) {
            console.error(error);
        }
    }
    const set_agent = (e) => {
        console.log(e.target.checked);
        // if (e.target.checked)
        // setagent(prev => true);
    }

    const HandleSubmit = () => {
        if (form_data.password !== form_data.confirm_password) {
            set_err("password doesnt match", 3)
            return;
        }
        else {
            handleSingup_email({ ...form_data })
                .then(responses => {
                    if (!isagent) navigate('/Login');
                    upload_image(file)
                        .then(response => {
                            console.log(response);
                            axios.post(`http://localhost:4000/Agents/AddDetails`, { uid: responses.uid, Imageurl: response, Gmail: form_data.email, Name: form_data.name })
                                .then(data => {
                                    console.log(data.data);
                                    set_err(data.data.message, data.data.iserror);
                                    navigate('/Login');
                                }).catch(err => console.log(err.message))
                        }).catch(err => console.log(err))
                }).catch(error => { set_err(error.message, error.iserror) })
        }
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
                            <img src={require('../images/signup-image.jpg')} />
                        </div>
                        <center className="create-account">
                            <a href="/Login" >I am already a member</a>
                        </center>
                    </div>
                    <div className="login-details">

                        <div classNamw="login-inner">
                            <div className="input-section no-line"><span>Singup</span></div>
                            {
                                isagent &&
                                <div className='input-section'>
                                    <label><AiOutlineUser /></label>
                                    <input
                                        className='input'
                                        type="file"
                                        required
                                        value={form_data.file}
                                        placeholder="Your Name"
                                        onChange={(e) => setfile(e.target.files[0])}
                                    >
                                    </input>
                                </div>
                            }
                            <div className='input-section'>
                                <label><AiOutlineUser /></label>
                                <input
                                    className='input'
                                    type="text"
                                    required
                                    value={form_data.name}
                                    placeholder="Your Name"
                                    onChange={(e) => (set_form(prev => ({ ...prev, name: e.target.value })))}
                                >
                                </input>
                            </div>
                            <div className='input-section'>
                                <label><MdEmail /></label>
                                <input
                                    className='input'
                                    type="email"
                                    value={form_data.email}
                                    placeholder="Email"
                                    onChange={(e) => (set_form(prev => ({ ...prev, email: e.target.value })))}
                                    required
                                >
                                </input>
                            </div>
                            <div className='input-section'>
                                <label><AiFillLock /></label>
                                <input
                                    className='input'
                                    type="password"
                                    value={form_data.password}
                                    placeholder="Password"
                                    onChange={(e) => (set_form(prev => ({ ...prev, password: e.target.value })))}
                                    id="password"
                                    required
                                />
                                {
                                    isopen ? <AiFillEye className="eye" size={30} onClick={() => { toggleeye("password") }} /> : < AiFillEyeInvisible className='eye' size={30} onClick={() => { toggleeye("password") }} />
                                }
                            </div>
                            <div className='input-section'>
                                <label><CiLock /></label>
                                <input
                                    className='input'
                                    type="password"
                                    value={form_data.confirm_password}
                                    placeholder="Renter Password"
                                    onChange={(e) => (set_form(prev => ({ ...prev, confirm_password: e.target.value })))}
                                    id="confirm_password"
                                    required
                                />
                                {
                                    isopenconfirm ? <AiFillEye className="eye" size={30} onClick={() => { toggleeye("confirm_password") }} /> : < AiFillEyeInvisible className='eye' size={30} onClick={() => { toggleeye("confirm_password") }} />
                                }
                            </div>
                            {/* 
                            <div className='input-section checkbox'>
                                <input type="checkbox" className="checkbox-input" required />
                                <label >I agree to all <a href="#" className='create-account'>Terms and Services</a></label>

                            </div> */}
                            <div className='input-sections checkbox'>
                                <input type="checkbox" className="checkbox-input" required onChange={e => setagent(e.target.checked)} />
                                <label>Register as Agent</label>
                            </div>


                            <center>
                                <Button as="a" variant="primary" style={{ alignItems: "center" }} onClick={HandleSubmit}>
                                    Register
                                </Button>
                            </center>
                        </div>
                        <ToastContainer />





                    </div>

                </div>


            </div>
        </div>

    )
}

export default SignUp