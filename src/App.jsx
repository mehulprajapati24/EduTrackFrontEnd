import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './pages/footer/Footer'

function App() {

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <Header/>
      <div className='min-h-[calc(100vh-150px)]'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
