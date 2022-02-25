export interface User {
  id: number
  name: string
}

export const getUser = (): Promise<User> => {
  return Promise.resolve({ id: 81, name: 'Cristian Orozco' })
}
