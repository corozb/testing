import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <li>
        <Link to='/finances'>Finances</Link>
      </li>
      <li>
        <Link to='/todo'>To Do</Link>
      </li>
    </>
  )
}

export default Home
