import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { getUser } from './utils/get-user'

const userMocked = jest.fn(getUser)

describe('When everything is OK', () => {
  const setup = () => {
    render(<App />)
  }

  beforeEach(async () => {
    await waitFor(() => expect(userMocked.mockResolvedValueOnce))
  })

  test('shoud render app component without crashing', () => {
    setup()
    screen.debug()
  })

  test('should select the children that is being passed to the CustomInput element', () => {
    setup()
    screen.getByText('Input:') // or with a regular expression || (/Input/)
    // Another way
    expect(screen.getByText('Input:')).toBeInTheDocument()
  })

  test('should select input element by its role', () => {
    setup()
    // When is just one
    // screen.getByRole('textbox')
    // Another way
    // expect(screen.getByRole('textbox')).toBeInTheDocument()

    // When we have many roles
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument()
    expect(screen.getAllByRole('textbox').length).toEqual(2)
  })

  test('should select a label element by its text', () => {
    setup()
    screen.getAllByLabelText('Input:')
  })

  test('should select an input element by placeholder text', () => {
    setup()
    screen.getAllByPlaceholderText('yo por estos lados')
  })

  test("should not found the role 'cualquier cosa' in the component", () => {
    setup()
    expect(screen.queryByRole('cualquier cosa')).toBeNull()
  })
})

describe('When the component fetching the user successfully', () => {
  beforeEach(() => {
    userMocked.mockClear()
  })

  test('should call get user onces', async () => {
    render(<App />)
    // await waitFor(() => expect(userMocked).toBeCalledTimes(1))
  })

  test('should render the username passed', async () => {
    const name = 'John'
    userMocked.mockResolvedValueOnce({ id: 1, name })
    render(<App />)
    expect(screen.queryByText(/Username/)).toBeNull()
    expect(await screen.findByText(/Username/)).toBeInTheDocument()
    screen.debug()
    // expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument()
  })

  // describe('When the user enters some text in the input element', () => {
  //   test('should display the text in the screen', async () => {
  //     render(<App />)
  //     await waitFor(() => expect(userMocked).toHaveBeenCalled())

  //     expect(screen.getByText(/You typed: .../))

  //     await userEvent.type(screen.getByRole('textbox'), 'David')

  //     expect(screen.getByText(/You typed: David/))
  //   })
  // })
})
