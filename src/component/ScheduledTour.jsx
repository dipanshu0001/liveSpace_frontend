import React, { useState, useEffect } from 'react'
import { useAuthData } from '../DataProvider/AccountProvider'
import axios from 'axios'
import '../css/Schedule.css'
import Agenttemplate from './Agenttemplate';

function ScheduledTour() {
  const { details, set_err } = useAuthData();
  const [data, setData] = useState([]);

  const handleCancel = async (_id) => {
    try {
      // console.log(_id)
      const result = await axios.post("https://backend-livespace.onrender.com/Tours/DeleteTourid", { _id, uid: details.uid })
      console.log(result.data.listings);
      setData(prev => ([...result.data.listings]))
      set_err(result.data.message, result.data.iserror);
    } catch (err) {
      set_err(err.message, err.iserror)
    }
  }
  useEffect(() => {
    const get_data = async () => {
      try {
        const result = await axios.post('https://backend-livespace.onrender.com/Tours/GetToursUser', { uid: details.uid});
        console.log(...result.data);
        setData(prev => ([...result.data]))
      } catch (err) {
        console.log(err);
      }
    }
    get_data();
  }, [])

  return (
    <div className='schedule-outer'>
      <div className="schedule-main">

        {
          data.length !==0?(data.map((ele, index) => (
        <Agenttemplate agent={ele.list} key={ele._id} isagent={true} isagent_id={false} is_schedule={true} Done={ele.Done} Tour_id={ele.Tour_id} handleCancel={handleCancel} />
        ))):(<>
          <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center" }}>
            <div style={{ display: "block" }}>
              <img src={require('../images/no-product.png')} />
            </div>
          </div>
        </>)
        }
      </div>
    </div>
  )
}

export default ScheduledTour