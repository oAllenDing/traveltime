import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/homepage'
import Login from './components/login'
import Template from './Template'
import Registration from './components/registration'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { useEffect } from 'react'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
