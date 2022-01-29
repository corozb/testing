import React, { useState } from 'react'
import './Counter.css'

const Counter = () => {
  const [counterValue, setCounterValue] = useState(0)
  const [inputValue, setInputValue] = useState(1)

  const addValue = () => setCounterValue(counterValue + inputValue)
  const subtrValue = () => setCounterValue(counterValue - inputValue)

  return (
    <div>
      <h2 data-testid='header'>Counter</h2>
      <h3 data-testid='counter' className={`${counterValue >= 100 ? 'green' : ''}${counterValue <= -100 ? 'red' : ''}`}>
        {counterValue}
      </h3>
      <button data-testid='subtract-btn' onClick={subtrValue}>
        -
      </button>
      <input
        className='text-center'
        type='number'
        data-testid='input'
        value={inputValue}
        onChange={(e) => setInputValue(+e.target.value)}
      />
      <button data-testid='add-btn' onClick={addValue}>
        +
      </button>
    </div>
  )
}

export default Counter
