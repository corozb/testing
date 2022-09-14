import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

it('test order phases for happy path', async () => {
  //* render app
  //* Don't need to wrap in provider; already wrapped!
  render(<App />)

  //* add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '1')

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })
  await userEvent.clear(chocolateInput)
  await userEvent.type(chocolateInput, '2')

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i })
  await userEvent.click(cherriesCheckbox)

  //* find and click order buttons
  const orderSummaryButton = await screen.findByRole('button', { name: /order sundae/i })
  await userEvent.click(orderSummaryButton)

  //* check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: /order summary/i })
  expect(summaryHeading).toBeInTheDocument()

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' })
  expect(toppingHeading).toBeInTheDocument()

  // check summary options items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
  expect(screen.getByText('Cherries')).toBeInTheDocument()

  //* alternatively
  // const optionItems = screen.getAllByRole('listitem')
  // const optionItemsText = optionItems.map((item) => item.textContent)
  // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries'])

  //* accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
  await userEvent.click(tcCheckbox)

  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i })
  await userEvent.click(confirmOrderButton)

  //* confirm order number on confirmation page
  // this one is async because there is a POST request to server in between summary
  // and confirmation pages
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  })
  expect(thankYouHeader).toBeInTheDocument()

  //* expect that loading has disappeared*/
  const loadingText = screen.queryByText('loading')
  expect(loadingText).not.toBeInTheDocument()

  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()

  //* click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /create new order/i })
  await userEvent.click(newOrderButton)

  //* check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00')
  expect(scoopsTotal).toBeInTheDocument()
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(toppingsTotal).toBeInTheDocument()

  //* wait for items to appear so that Testing Library doesn't get angry about about stuff
  //* happening after test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})

it('test toppings header is not on summary page if no toppings ordered', async () => {
  //* render app */
  render(<App />)

  //* add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '1')

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })
  await userEvent.clear(chocolateInput)
  await userEvent.type(chocolateInput, '2')

  //* find and click order summary button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i })
  await userEvent.click(orderSummaryButton)

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i })
  expect(toppingsHeading).not.toBeInTheDocument()
})

it('test toppings header is not on summary page if toppings ordered, then removed', async () => {
  //* render app
  render(<App />)

  //* add ice cream scoops
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '1')

  //* add a topping and confirm
  const cherriesTopping = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  await userEvent.click(cherriesTopping)
  expect(cherriesTopping).toBeChecked()
  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false })
  expect(toppingsTotal).toHaveTextContent('1.50')

  //* remove the topping
  await userEvent.click(cherriesTopping)
  expect(cherriesTopping).not.toBeChecked()
  expect(toppingsTotal).toHaveTextContent('0.00')

  //* find and click order summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  })
  await userEvent.click(orderSummaryButton)

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $2.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i })
  expect(toppingsHeading).not.toBeInTheDocument()
})

it('test disable order button if there are no scoops ordered', async () => {
  //* render app */
  render(<App />)

  //* order button should be disabled at first, even before options load */
  let orderButton = screen.queryByRole('button', { name: /order sundae/i })
  expect(orderButton).toBeDisabled()

  //* expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '1')
  expect(orderButton).toBeEnabled()

  //* expect button to disabled again after removing scoop
  await userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '0')
  expect(orderButton).toBeDisabled()
})
