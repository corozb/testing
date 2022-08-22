import { render, screen } from '@testing-library/react'

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
})
