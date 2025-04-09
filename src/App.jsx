import React from 'react'
import SignUp from './LoginComponents/SignUp'
import SignIn from './LoginComponents/SignIn'
import Dashboard from './HomePage/Dashboard'
import Navbar from './components/Navbar'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Scanner from './components/Scanner'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/login' element={<SignIn/>}></Route>
        <Route path='/home' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
