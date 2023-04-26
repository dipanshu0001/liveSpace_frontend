import React from 'react'

function Loading() {
  return (
    <div style={{display:"flex",justifyContent:"center",width:"100%",alignItems:"center"}}>
        <img src={require('../images/Loading.gif')} height="100px" width="100px"/>
    </div>
  )
}

export default Loading