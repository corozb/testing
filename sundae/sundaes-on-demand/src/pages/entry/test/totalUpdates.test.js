import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import { OrderEntry } from '../OrderEntry'

describe('total and subtotal updates', () => {
  it('update scoop subtotal when scoop change', async () => {
    render(<Options optionType='scoops' />)

    //* make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopsSubtotal).toHaveTextContent('0.00')

    //* update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')

    //* update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    await userEvent.clear(chocolateInput)
    await userEvent.type(chocolateInput, '2')
    expect(scoopsSubtotal).toHaveTextContent('4.00')
  })
  it('update toppings subtotal when topping change', async () => {
    render(<Options optionType='toppings' />)

    //* make sure total starts out $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })
    expect(toppingsSubtotal).toHaveTextContent('0.00')

    //* add cherries and check subtotal
    const cherryInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    await userEvent.click(cherryInput)
    expect(toppingsSubtotal).toHaveTextContent('1.50')

    //* add M&Ms and check subtotal
    const mandmInput = await screen.findByRole('checkbox', {
      name: /m&ms/i,
    })
    await userEvent.click(mandmInput)
    expect(toppingsSubtotal).toHaveTextContent('3.00')

    //* remove M&Ms and check subtotal
    await userEvent.click(mandmInput)
    expect(toppingsSubtotal).toHaveTextContent('1.50')
  })
})

describe('grand total', () => {
  it('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    //* check that the grand total starts out at 0.00
    expect(grandTotal).toHaveTextContent('0.00')

    //* update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    //* add cherries and check grand total
    const cherryInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    await userEvent.click(cherryInput)
    expect(grandTotal).toHaveTextContent('5.50')
  })

  it('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    //* add cherries and check grand total
    const cherryInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    await userEvent.click(cherryInput)
    expect(grandTotal).toHaveTextContent('1.50')

    //* update vanilla scoops to 1 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('3.50')
  })

  it('test grand total properly if item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    //* add cherries
    const cherryInput = await screen.findByRole('checkbox', { name: /cherries/i })
    await userEvent.click(cherryInput)

    //* update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')

    //* remove 1 scoop of vanilla and check grand total
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '1')

    //* check grand total
    expect(grandTotal).toHaveTextContent('3.50')

    //* removes cherries and check grand total
    await userEvent.click(cherryInput)
    expect(grandTotal).toHaveTextContent('2.00')
  })
})
