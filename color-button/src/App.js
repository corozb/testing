import React, { useState } from 'react'
import './App.css'

export const replaceCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [buttonColor, setButtonColor] = useState('red')
  const [isDisabled, setIsDisabled] = useState(false)
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'

  const changeColor = () => setButtonColor(newButtonColor)
  const handleDisable = (e) => setIsDisabled(e.target.checked)

  return (
    <div className='App'>
      <button onClick={changeColor} style={{ background: isDisabled ? 'gray' : buttonColor }} disabled={isDisabled}>
        Change to {newButtonColor}
      </button>
      <br />
      <input
        type='checkbox'
        id='disable-button-checkbox'
        defaultChecked={isDisabled}
        aria-checked={isDisabled}
        onChange={handleDisable}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  )
}

export default App
