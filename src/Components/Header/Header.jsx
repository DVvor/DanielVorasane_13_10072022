import './Header.css'
import { React } from 'react'
import { Link } from "react-router-dom";
import argentBankLogo from '../../Assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { logOut } from '../../Store/store'

// Pages
// import Home from '../../Pages/Home/Home'

/**
 * Create a component
 * @returns { JSX }
 */



function Header() { 
  const userFirstname = useSelector ((state) => state.user)
  const isLoggedIn = useSelector ((state) => state.logState)
  const dispatch = useDispatch()

  let button;
  let userbutton;

  function handleClick() {
    dispatch(logOut())
  }

  // Display nav-item different according to login/logout
  if (!isLoggedIn) {
    button = 
    <Link className="main-nav-item" to="/signin" onClick={handleClick}>
    <FontAwesomeIcon icon={faCircleUser} />
    {/* <i class="fa fa-user-circle"></i> */}
    Sign In
    </Link>
  } else {
    userbutton =
    <Link className="main-nav-item" to="/user">
      <FontAwesomeIcon icon={faCircleUser} />
      {/* <i class="fa fa-user-circle"></i> */}
      {userFirstname}
    </Link>;
    button =
    <Link className="main-nav-item" to="/signin" onClick={handleClick}>
      <FontAwesomeIcon icon={faSignOut} />
      {/* <i class="fa fa-user-circle"></i> */}
      Sign out
    </Link>;
  }


  return (
      <header>
        <nav className="main-nav">
          <Link to="/home" className='main-nav-logo' >
            <img alt='Argent Bank Logo' className='main-nav-logo-image' src={argentBankLogo} />
          </Link>
          <div className='log-nav'>
          {userbutton}
          {button}
          </div>
        </nav>
      </header>
  )
}

export default Header