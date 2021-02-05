import React from 'react'

const Controls = ({ strike, ball, foul, hit }) => {
  return (
    <div>
      <button onClick={strike}>strike</button>
      <button onClick={ball}>ball</button>
      <button onClick={foul}>foul</button>
      <button onClick={hit}>hit</button>
    </div>
  )
}

export default Controls
