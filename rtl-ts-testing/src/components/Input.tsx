import React, { useState } from 'react'
import CustomInput from './CustomInput'

function Input() {
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <>
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <p>You typed: {text || '...'}</p>
    </>
  )
}

export default Input
