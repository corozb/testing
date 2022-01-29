import React from 'react'
import { shallow } from 'enzyme'

import Home from './Pages/Home'

test('renders Home title', () => {
  const home = shallow(<Home />)
  const title = <h1>Home</h1>
  expect(home.contains(title)).toEqual(true)
})
