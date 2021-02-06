import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Todo from './ToDo'

describe('simulating user interation', () => {
  test('allows users to add items to their list', () => {
    const { getByText, getByLabelText, getByDisplayValue } = render(<Todo />)

    const input = getByLabelText('What needs to be done?')
    const button = getByText('Add #1')

    // Simulate user events
    fireEvent.change(input, { target: { value: 'Learn spanish' } })
    fireEvent.click(button)

    // Make assertion
    getByDisplayValue('Learn spanish')
    // getByText(/Add #2/)
  })

  // userEvent
  test('user-events allows users to add...', () => {
    const { getByText, getByLabelText, getByDisplayValue } = render(<Todo />)

    const input = getByLabelText('What needs to be done?')
    const button = getByText('Add #1')

    userEvent.type(input, 'Learn spanish')
    userEvent.click(button)

    getByDisplayValue(/Learn spanish/)
    // getByText('Add #2')
  })
})
