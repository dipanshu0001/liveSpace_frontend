import React from 'react'

function Heading({ small, large }) {
    return (

        <div className="headings">
            <h4 className='blue-heading'>{small}</h4>
            <h1 className='large-heading'>{large}</h1>
        </div>
    )
}

export default React.memo(Heading)