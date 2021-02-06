import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import App from './App'

afterEach(cleanup) // clean testing dom for each test

describe('<App />', () => {
  test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/Display/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    render(<App />)
  })

  it('One Big Test', () => {
    const { getByText } = render(<App />)
    const strike = getByText(/^strike$/i)
    const ball = getByText(/^ball$/i)
    const foul = getByText(/^foul$/i)
    const hit = getByText(/^hit$/i)

    // Test that strike works
    fireEvent.click(strike)
    fireEvent.click(strike)
    getByText(/Strikes: 2/)

    // Test that strike works
    fireEvent.click(ball)
    fireEvent.click(ball)
    fireEvent.click(ball)
    getByText(/Balls: 3/)

    //Test that strike rolls over the count
    fireEvent.click(strike)
    getByText(/Strikes: 0/)
    getByText(/Balls: 0/)

    //Test that strike rolls over the count
    fireEvent.click(strike)
    fireEvent.click(strike)
    fireEvent.click(ball)
    fireEvent.click(ball)
    fireEvent.click(ball)
    fireEvent.click(ball)
    getByText(/Strikes: 0/)
    getByText(/Balls: 0/)

    // Test that foul doesn't increment strikes past 2
    fireEvent.click(foul)
    getByText(/Strikes: 1/)
    fireEvent.click(foul)
    getByText(/Strikes: 2/)
    fireEvent.click(foul)
    getByText(/Strikes: 2/)

    // Check that hit resets count
    fireEvent.click(ball)
    fireEvent.click(ball)
    fireEvent.click(hit)
    getByText(/Strikes: 0/)
    getByText(/Balls: 0/)
  })
})
