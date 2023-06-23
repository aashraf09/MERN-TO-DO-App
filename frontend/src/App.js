import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <main className='app'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' exact element={<Login/>}></Route>
          <Route path='/signup' element={<Register />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App