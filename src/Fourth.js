import React from 'react'
import "./Fourth.css"

function Fourth({building,para,head}) {
  return (
    <div className='first'>
        <div className="fourMain">
          <div className="fourMain-left">
            <h1>{head}</h1> 
              <p>{para}</p>
          </div>
          <div className="fourMain-right">
            <img src={building} alt="" />
          </div>
        </div>

    
    </div>
  )
}

export default Fourth