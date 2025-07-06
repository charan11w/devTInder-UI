import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './components/layouts/MainLayout'
import Login from './components/pages/Login'

function App() {

  return (
    <BrowserRouter basename='/'>
    <Routes>
      <Route  path='/' element={<MainLayout />}>
         <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
