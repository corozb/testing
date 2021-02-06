import React from 'react'
import { fireEvent, render } from '@testing-library/react'
// import '@testing-library/react/cleanup-after-each' //clear testing dom
import Controls from './Controls'

describe('<Controls/>', () => {
  it('renders without crashing', () => {
    render(<Controls />)
  })

  // v1
  it('strike', () => {
    const { getByText } = render(<Controls strike={() => console.log('strike')} />)
    const strikeButton = getByText(/strike/i)

    fireEvent.click(strikeButton)
  })

  // v2
  it('strike button 2', () => {
    let clicked = true
    const { getByText } = render(<Controls strike={() => (clicked = true)} />)
    const strikeButton = getByText(/strike/i)

    fireEvent.click(strikeButton)
    expect(clicked).toBe(true)
  })

  // v3
  it('click with mocked function, better way', () => {
    const mockedFn = jest.fn()
    const { getByText } = render(<Controls strike={mockedFn} />)
    const strikeButton = getByText(/strike/i)

    fireEvent.click(strikeButton)
    expect(mockedFn).toBeCalled()
  })

  it('test all the buttons', () => {
    const buttonText = ['strike', 'ball', 'foul', 'hit']
    const buttonFns = buttonText.map(() => jest.fn())
    const props = buttonText.reduce((acc, el, index) => ({ ...acc, [el]: buttonFns[index] }), {})

    const { getByText } = render(<Controls {...props} />)
    const buttons = buttonText.map((text) => getByText(new RegExp(text, 'i')))
    buttons.forEach((button, index) => {
      fireEvent.click(button)
      expect(buttonFns[index]).toBeCalled()
    })
  })
})
