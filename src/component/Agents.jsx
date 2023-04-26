import react, { useEffect, useState } from 'react'
import { navbarImage } from '../databse/nav-bar-database'
import Agentprofile from './Agentprofile'
import { AiOutlineHome } from "react-icons/ai";
import Behindnavbar from './Behindnavbar'
import '../css/Agents.css'
import backgroundImage from '../images/agent-bg.jpg'
import MoreListing from './MoreListing'
import axios from 'axios'
function Agents() {
  const [moredata, setmoredata] = useState([]);
  const[data,setData]=useState([]);
  const get_data = async () => {
    try {
      const data = await axios.post('https://backend-livespace.onrender.com/Listings/LimitedDisplay',{quantity:15});
      console.log(data);

      setmoredata(prev => ([...data.data]));
    } catch (e) { console.log(e.message) }
  }
  useEffect(() => {
    const get_agent_data = async () => {
      try {
        const result = await axios.post("https://backend-livespace.onrender.com/Agents/AllAgents");
        setData(prev => ([...result.data]))
        console.log(result.data)
      } catch (err) {
        // set_err(err.message,err.iserror)
        console.log(err.message)
      }
    }
    get_agent_data();
    get_data();

  }, [])


  return (
    <div className="agents-outer">
      <div className='img-outer'>
        <div className="img-div" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
        </div>
        <div className="content">
          <span>Agent Archive</span>
          <ul>
            <li><a href="/"><AiOutlineHome size={20} color="white" style={{ paddingBottom: "3px" }} /></a></li>
            <li><span>/</span></li>
            <li><span>Agent Archive</span></li>
          </ul>
        </div>

      </div>


      <div className='main'>
        <div className='profile-div'>
          {
            data.map((ele, index) => (<Agentprofile {...ele} key={index} />))
          }
        </div>
        <MoreListing heading="Recent Listing" moredata={moredata} />
      </div>
    </div>
  )
}

{/* <h1>hello</h1> */ }
export default Agents