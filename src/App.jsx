import { useState } from 'react'
import './App.css'
import Router from './Router'
import Headers from './components/Header/index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Headers/>
     <Router/>
    </>
  )
}

export default App
