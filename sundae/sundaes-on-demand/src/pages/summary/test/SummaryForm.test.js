import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

describe('SummaryForm', () => {
  test('Initial conditions', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
    expect(checkbox).not.toBeChecked()

    const confirmButton = screen.getByRole('button', { name: /confirm order/i })
    expect(confirmButton).toBeDisabled()
  })

  test('Checkbox enables button on first click and disables on second click', async () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
    const confirmButton = screen.getByRole('button', { name: /confirm order/i })

    const user = userEvent.setup()
    // fireEvent.click(checkbox)
    await user.click(checkbox)
    expect(confirmButton).toBeEnabled()

    // fireEvent.click(checkbox)
    await user.click(checkbox)
    expect(confirmButton).toBeDisabled()
  })
  test('Popover respond to hover', async () => {
    render(<SummaryForm />)
    const user = userEvent.setup()

    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument()

    // popover appears upon mouseover on checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    await user.hover(termsAndConditions)

    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    // popover disappears when we mouse out
    user.unhover(termsAndConditions)

    //* first option */
    // await user.unhover(termsAndConditions)
    // expect(popover).not.toBeInTheDocument()

    //* second option */
    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i))
  })
})
