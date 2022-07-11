import React from 'react'
import Header from "../../Components/Header/Header"
import Footer from '../../Components/Footer/Footer'
import './Layout.css'

import { Outlet } from 'react-router-dom'

/**
 * Create a layout with principal component
 * @returns { JSX }
*/

function Layout() {
  
  return (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
  )

}

export default Layout