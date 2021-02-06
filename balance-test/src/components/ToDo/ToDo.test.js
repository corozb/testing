import React from 'react'
import ReactDOM from 'react-dom'
import { getQueriesForElement, render } from '@testing-library/react'

import Todo from './ToDo'

describe('todo component', () => {
  // Version 1 without library
  it('renders the correct content VERSION 1', () => {
    const root = document.createElement('div')
    ReactDOM.render(<Todo />, root)

    expect(root.querySelector('h1').textContent).toBe("TODO's")
    expect(root.querySelector('label').textContent).toBe(
      'What needs to be done?'
    )
    expect(root.querySelector('button').textContent).toBe('Add #1')
  })

  // Version 2
  it('renders the correct content using react testing library', () => {
    const root = document.createElement('div')
    ReactDOM.render(<Todo />, root)

    const { getByText, getByLabelText } = getQueriesForElement(root)

    // expect(getByText("TODO's")).not.toBeNull()
    // expect(getByLabelText('What needs to be done?')).not.toBeNull()
    // expect(getByText('Add #1')).not.toBeNull()

    getByText("TODO's")
    getByLabelText('What needs to be done?')
    getByText('Add #1')
  })

  // Version 3
  // const render = (component) => {
  //   const root = document.createElement('div')
  //   ReactDOM.render(component, root)
  //   return getQueriesForElement(root)
  // }

  // it('Testing using react testing library V3', () => {
  //   const { getByText, getByLabelText } = render(<Todo />)

  //   getByText("TODO's")
  //   getByLabelText('What needs to be done?')
  //   getByText('Add #1')
  // })

  // Version 4
  it('Testing using react testing library V3', () => {
    const { getByText, getByLabelText } = render(<Todo />)

    getByText("TODO's")
    getByLabelText('What needs to be done?')
    getByText('Add #1')
  })
})
