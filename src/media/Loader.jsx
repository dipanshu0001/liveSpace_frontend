import React from 'react'
// import {} from 
function Loader() {
  const csss={
    alignItems:'center',
    background: 'rgba(69, 69, 69,.3)',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    left: '0',
    position: 'fixed',
    top: '0',
    transition: 'opacity 0.3s linear',
    width: '100%',
    zIndex:' 19',
  }
  return (
    <div style={csss}>
      <img  width="100px" height="100px"src={require('../images/Loader.gif')}/>
    </div>
  )
}

export default Loader