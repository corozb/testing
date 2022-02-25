import React from 'react'

interface Props {
  children: React.ReactNode
  value: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const CustomInput = ({ children, value, onChange }: Props) => {
  return (
    <div>
      <label htmlFor='search'>{children}</label>
      <input id='search' type='text' value={value} onChange={onChange} placeholder='yo por estos lados' />
    </div>
  )
}

export default CustomInput
