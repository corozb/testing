import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import App, { replaceCamelWithSpaces } from './App'

const setup = () => render(<App />)
describe('test change color', () => {
  test('button has correct initial color', () => {
    setup()
    const colorButton = screen.getByRole('button', { name: 'Change to blue' })
    expect(colorButton).toHaveStyle({ backgroundColor: 'red' })

    // Click Button∫
    fireEvent.click(colorButton)
    expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })
    expect(colorButton.textContent).toBe('Change to red')
  })

  test('initial conditions', () => {
    setup()
    const colorButton = screen.getByRole('button', { name: 'Change to blue' })
    expect(colorButton).toBeEnabled()

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })
})

test('Checkbox disabled button on first click and enables on second click', () => {
  setup()
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('Disabled button has gray background and reverts to red', () => {
  setup()
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  // disable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray')

  // re-enable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: red')
})

test('Disabled button has gray background and reverts to blue', () => {
  setup()
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  // change button to blue
  fireEvent.click(colorButton)

  // disable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray')
})

test('Clicked disabled button has gray background and reverts to blue', () => {
  setup()
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  // change button to blue
  fireEvent.click(colorButton)

  // disable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray')

  // re-enable button
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: blue')
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
