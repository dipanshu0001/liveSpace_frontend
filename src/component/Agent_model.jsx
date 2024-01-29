import React, { useState, useEffect } from 'react'
import { useAuthData } from '../DataProvider/AccountProvider'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import '../css/Agent_model.css'


function Agent_model({Listing_id,update}) {
    const [lgShow, setLgShow] = useState(false);
    const [data, setData] = useState([]);
    const { set_err } = useAuthData();
    useEffect(() => {
        const get_data = async () => {
            try {
                const result = await axios.post(`http://localhost:4000/Agents/AllAgentsAssign`);
                setData(prev => ([...result.data]))
                console.log(result.data)
            } catch (err) {
                // set_err(err.message, err.iserror)
                console.log(err.message)
            }
        }
        get_data();
    }, [])
    const handleAssign=async(uid)=>{
        try{
            const result=await axios.post(`http://localhost:4000/Agents/AssignAgent`,{_id:Listing_id,uid});
            console.log(result.data.agents)
            setData(prev=>([...result.data.agents]))
            set_err(result.data.message,result.data.iserror)
            update(prev=>prev+1)
        }
        catch(e){
            set_err(e.message,e.iserror)
        }
    }
    console.log(data)
    return (
        <>
            <Button onClick={() => setLgShow(true)}>Assign Agent</Button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        All Agents
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{
                    maxHeight: 'calc(100vh - 160px)',
                    overflowY: 'auto'
                }}>
                    {
                        data.map((ele, index) => (
                            <>
                                <div className='model-outer'>
                                    <div className="model-main">
                                        <div className="image-div">
                                            <img src={ele.Imageurl} />
                                        </div>
                                        <ul className="details">
                                            <li className="li-contents"><h6>Name:</h6><span>{ele.Name}</span></li>
                                            <li className="li-contents"><h6>Gmail:</h6><span>{ele.Gmail}</span></li>
                                            <li className="li-contents"><h6>Assigned Listings:</h6><span>{ele.Assigned_list}</span></li>

                                        </ul>
                                    </div>
                                    <div>
                                        <Button onClick={()=>handleAssign(ele.uid)}>Assgin to List</Button>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </Modal.Body>

            </Modal>
        </>

    )
}

export default Agent_model