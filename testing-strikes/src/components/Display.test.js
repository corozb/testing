import React from 'react'
import { render } from '@testing-library/react'
import Display from './Display'

describe('<Display />', () => {
  it('render without crashing', () => {
    render(<Display />)
  })
  it('props works', () => {
    const display = render(<Display strikes={3} balls={2} />)
    display.getByText(/Strikes: 3/)
    display.getByText(/Balls: 2/)
  })
  it('props works with regular expressions', () => {
    const strikes = 2,
      balls = 3
    const display = render(<Display strikes={strikes} balls={balls} />)
    display.getByText(new RegExp(`Strikes: ${strikes}`, 'i'))
    display.getByText(new RegExp(`Balls: ${balls}`, 'i'))
  })

  it('Component is dumb', () => {
    const display = render(<Display strikes={3000} balls={-200} />)
    display.getByText(/Strikes: 3000/)
    display.getByText(/Balls: -200/)
  })
})
