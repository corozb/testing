import { sumPositiveNumbers } from './example/example'

describe('when the arguments passed are positive numbers', () => {
  test('should return the right answer', () => {
    expect(sumPositiveNumbers(4, 6)).toBe(10)
  })
})

describe('when one of the arguments is a negative number', () => {
  test('should throw an error', () => {
    let error
    let errorMessage
    try {
      sumPositiveNumbers(-2, 4)
    } catch (err) {
      error = err
    }
    expect(error).toBeDefined()

    if (error instanceof Error) {
      errorMessage = error.message
    }
    expect(errorMessage).toBe('Invalid negative number')
  })
})
