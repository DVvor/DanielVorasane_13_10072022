import './Header.css'
import argentBankLogo from '../../Assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import { React, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { logOut } from '../../Store/store'
import { getUserData } from '../../Store/store';
import { getUserInfos } from '../../Services/callApi';
import { getItem } from '../../Services/LocalStorage';
import { removeItem } from '../../Services/LocalStorage';


/**
 * Create a component
 * @returns { JSX }
 */
function Header() { 
  // const userData = useSelector ((state) => state)
  const userFirstname = useSelector ((state) => state.user.firstName)
  const isLoggedIn = useSelector ((state) => state.logState)
  const dispatch = useDispatch()
  
  let button = "" // button sign in / sign out
  let userbutton = "" // button to get to user's page
  
  function handleClick() {
    dispatch(logOut())
    removeItem("token")
    removeItem("user")
  }

  // Display nav-item different according to login/logout
  if (!isLoggedIn) {
    button = 
    <Link className="main-nav-item" to="/signin" onClick={handleClick}>
    <FontAwesomeIcon icon={faCircleUser} />
    Sign In
    </Link>
  } else {

    userbutton =
    <Link className="main-nav-item" to="/user">
      <FontAwesomeIcon icon={faCircleUser} />
      {userFirstname}
    </Link>;
    button =
    <Link className="main-nav-item" to="/signin" onClick={handleClick}>
      <FontAwesomeIcon icon={faSignOut} />
      Sign out
    </Link>;
  }

  // Retrieve user's datas from APi 
  function getUserInfosFromAPI() {
    const token = getItem("token")
    
    if (token) {
      getUserInfos('http://localhost:3001/api/v1/user/profile', {}, token)
        .then (response => {
          const user = {
            firstName: response.data.body.firstName,
            lastName: response.data.body.lastName
          }
          dispatch(getUserData(user))
        })
        .catch( function(error) {
            if(error.response) {
              console.log("error: login not found")
            }
        })
    }
  }

  useEffect(() => {
    getUserInfosFromAPI()
  }, [isLoggedIn]);

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