import DataTable from './screens/Customers/DataTable'
import Auth from './screens/auth/Auth'
import './App.css'
import Home from './screens/home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/signup'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Auth><Login /></Auth>} />
        <Route exact path='/signup' element={<Auth><Signup /></Auth>} />
      </Routes>
    </>
  )
}

export default App
