import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { set_err } from '../Functions/Auth-Provider-Functions';

function AllTour() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const get_data = async () => {
      try {
        const result = await axios.post(`http://localhost:4000/Tours/GetAllTour`);
        // console.log(result.data);
        setData(prev => ([...result.data]))
      }
      catch (e) {
        console.log("admin ALLtour Error", e.message);
      }
    }
    get_data();
  }, [])
  const CancelTour=async(_id)=>{
    try{
      const result = await axios.post(`http://localhost:4000/Tours/CancelTour`,{_id});
      set_err(result.data.messag,result.data.iserror);
    }catch(e){
      set_err(e.message,e.iserror)
    }
  }
  return (
    <div className='all-tour'>
      {
        data.map((ele, index) => {
          console.log(ele)
          return <>
            <Card>
              <center><Card.Header><h5>Tour {index+1}</h5></Card.Header></center>
              <Card.Body>
                <Card.Title><small>Name:</small><span>{ele.Name}</span></Card.Title>
                <Card.Title><small>Email:</small><span>{ele.Email}</span></Card.Title>
                <Card.Title><small>Phone:</small><span>{ele.Phone}</span></Card.Title>
                <Card.Text>
                  {ele.Comment}
                </Card.Text>
                <center>
                {
                  ele.Done?
                  (<Button disabled={true}  variant="success">Already Done</Button>):
                  (<Button disabled={ele.isCancel} variant="danger" onClick={()=>CancelTour(ele._id)}>{ele.isCancel?"Already Canceled":"Cancel"}</Button>)
                }
                </center>
              </Card.Body>
            </Card>
          </>
      })

      }
    </div>
  )
}

export default AllTour