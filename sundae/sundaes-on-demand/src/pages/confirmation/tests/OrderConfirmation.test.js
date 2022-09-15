import { render, screen } from '../../../test-utils/testing-library-utils'
import { server } from '../../../mocks/server'
import { rest } from 'msw'

import OrderConfirmation from '../OrderConfirmation'

it('test error response from server for submitting order', async () => {
  //* override default msw response for options endpoint with error response
  server.resetHandlers(rest.post('https://localhost:3030/order', (req, res, ctx) => res(ctx.status(500))))

  render(<OrderConfirmation setOrderPhase={jest.fn()} />)

  const alert = await screen.findByRole('alert')
  expect(alert).toHaveTextContent('An expected error occurred. Please try again later.')
})
