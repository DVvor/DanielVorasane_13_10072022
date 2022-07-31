import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'

//Pages
import Layout from './Pages/Layout/Layout'
import Home from './Pages/Home/Home'
import Errorpage from './Pages/Errorpage/Errorpage'
import SignIn from './Pages/Sign-in/SignIn';
import User from './Pages/User/User';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Layout />}>
            <Route index element={<Navigate to="/home"></Navigate>} /> {/* by default user(12) */}
            <Route index path='/home' element={<Home />} />
            <Route index path='/signin' element={<SignIn />} />
            <Route index path='/user' element={<User />} />
            <Route path='/*' element={<Errorpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;