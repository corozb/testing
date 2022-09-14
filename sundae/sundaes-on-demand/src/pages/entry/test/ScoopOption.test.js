import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScoopOption from '../ScoopOption'

it('indicate if scoop count is non-int or out of range', async () => {
  render(<ScoopOption name='Vanilla' imagePath='vanilla.png' updateItemCount={jest.fn()} />)

  //* expect input to be invalid with negative number
  const vanillaInput = screen.getByRole('spinbutton', { name: 'Vanilla' })
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '-1')
  expect(vanillaInput).toHaveClass('is-invalid')

  //* replace with decimal input
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '2.5')
  expect(vanillaInput).toHaveClass('is-invalid')

  //* replace with input that's too high
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '11')
  expect(vanillaInput).toHaveClass('is-invalid')

  //* replace with valid input
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '3')
  expect(vanillaInput).not.toHaveClass('is-invalid')
})
