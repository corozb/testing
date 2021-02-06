import React from 'react'

const Display = ({ strikes, balls }) => {
  return (
    <div>
      <h1>Display</h1>
      <p>Strikes: {strikes} </p>
      <p>Balls: {balls}</p>
    </div>
  )
}

export default Display
