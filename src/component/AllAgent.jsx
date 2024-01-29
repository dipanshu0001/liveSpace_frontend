import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useAuthData } from '../DataProvider/AccountProvider'
import Agentprofile from './Agentprofile';
import "../css/AllAgent.css"
import Button from 'react-bootstrap/Button';

function AllAgent() {
    const[data,setData]=useState([]);
    const {set_err}=useAuthData();
    useEffect(()=>{
        const get_data=async()=>{
            try{
                const result=await axios.post(`http://localhost:4000/Agents/AllAgents`);
                setData(prev=>([...result.data]))
                console.log(result.data)
            }catch(err){
                // set_err(err.message,err.iserror)
                console.log(err.message)
            }
        }
        get_data();
    },[])
    const handleDelete=async(uid)=>{
        // console.log("helloe");
        // console.log(uid);
        try{
            const result=await axios.post(`http://localhost:4000/Agents/DeleteAgent`,{uid});
            set_err(result.data.message,result.data.iserror);
            setData(prev=>([...result.data.new_result]));
        }catch(e){
            set_err(e.message,e.iserror);
        }
    }
  return (
    <div className='allagent-outer'>
        {
            data.map((ele,index)=>(
                <>
                    
                <Agentprofile {...ele} key={index } isAll={true} handleDelete={handleDelete}/>
                {/* <Button>Delete</Button>/ */}
                </>
            ))
        }
    </div>
  )
}

export default AllAgent