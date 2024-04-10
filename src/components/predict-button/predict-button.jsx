import React from 'react'
import './predict-button.css'

function PredictButton({submitChamps}) {
  return (
    <div className='predict-button-module module-button'>
      <button onClick={submitChamps} className='predict-button text-size'>PREDICT!</button>
    </div>
  )
}

export default PredictButton