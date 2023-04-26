import React from 'react'
import L_r_button from './Buttons';
import '../css/Agentprofile.css'
import Button from 'react-bootstrap/Button';

function Agentprofile({ Imageurl, Name, text, uid, isAll, handleDelete,Description }) {
  // console.log(text);
  return (
    <div className="agent-outer">
      <div className="agent-inner">
        <div className="img_folder">
          <img src={Imageurl} className="agent_profile" />
          <h5>{Name.toUpperCase()}</h5>
        </div>
        <div className="details-folder">
          <p>{Description}</p>
        </div>
        {!isAll ? 
        (<>
          <a href={`Agent_details/${uid}`}><L_r_button data="view" Where_to={""} /></a>
        </>):
          (<Button variant="danger" onClick={() => handleDelete(uid)}>Delete</Button>)
        
        }
      </div>

    </div>
  )
}
{/* (<L_r_button data="view" Where_to={}/>): */ }

export default Agentprofile