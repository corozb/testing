export const sumPositiveNumbers = (a: number, b: number) => {
  if (a < 0 || b < 0) {
    throw new Error('Invalid negative number')
  }
  return a + b
}
