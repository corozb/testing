import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Todo from './components/ToDo/ToDo'
import Home from './Pages/Home'
import Finances from './components/Finances/Finances'

function App() {
  return (
    <>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/todo' component={Todo} />
        <Route exact path='/finances' component={Finances} />
      </Router>
    </>
  )
}

export default App
