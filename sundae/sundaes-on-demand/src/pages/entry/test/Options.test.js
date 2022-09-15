import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'

import Options from '../Options'

describe('Options Component', () => {
  test('display image for each scoop option from server', async () => {
    render(<Options optionType='scoops' />)

    //* find Images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2)

    //* confirm alt text of images
    const altText = scoopImages.map((image) => image.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })

  test('display image for each toppings option from server', async () => {
    render(<Options optionType='toppings' />)

    //* find Images
    const images = await screen.findAllByRole('img', { name: /topping$/i })
    expect(images).toHaveLength(3)

    //* confirm alt text of images
    const altText = images.map((image) => image.alt)
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping'])
  })

  it("don't update total if scoops input is invalid", async () => {
    render(<Options optionType='scoops' />)

    //* expect button to be enabled after adding scoops
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '-1')

    //* make sure scoops subtotal hasn't updated
    const scoopsSubtotal = screen.getByText('Scoops total: $0.00')
    expect(scoopsSubtotal).toBeInTheDocument()
  })
})
