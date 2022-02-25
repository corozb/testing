import React, { useEffect, useState } from 'react'
import Input from './components/Input'
import { getUser, User } from './utils/get-user'
import './App.css'
import Pokemon from './components/Pokemon/Pokemon'

function App() {
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = async () => {
    const user = await getUser()
    setUser(user)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='App'>
      {user && <p>Username: {user?.name}</p>}
      <header className='App-header'>
        <h1>React Texting Library</h1>
      </header>
      <Input />
      <Pokemon />
    </div>
  )
}

export default App
