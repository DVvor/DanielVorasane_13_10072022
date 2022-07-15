import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'
import axios from 'axios'
import { login, getUserFirstName } from '../../Services/callApi'
import { setUserFirstName, logIn } from '../../Store/store'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userFirstname = useSelector ((state) => state.user)
  console.log(userFirstname)

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState()
  // console.log(username)

  function handleUsernameChange(event) {
    const inputValue = event.target.value
    setUsername(inputValue)
  }

  function handlePasswordChange(event) {
    const inputValue = event.target.value
    setPassword(inputValue)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const body = {
      "email": username,
      "password": password
    }

    login('http://localhost:3001/api/v1/user/login', body)
    .then(response => {
      if (response.status === 200) {
        const token = response.data.body.token
        dispatch(logIn())
        navigate("/user");
        getUserFirstName('http://localhost:3001/api/v1/user/profile', {}, token)
        .then(response => {
          dispatch(setUserFirstName(response.data.body.firstName))
        })
      }
    })
    .catch( function(error) {
      if(error.response) {
        console.log("error: login not found")
      }
    })

    console.log(userFirstname)
  }
  


  return (
    <main className="main bg-dark">
      <div className='sign-in-content'>
        {/* <i className="fa fa-user-circle sign-in-icon"></i> */}
        <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" />

        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label name="username"> Username </label>
            <input type="text" id="username" onChange={handleUsernameChange}  /> 
            {/*  className={isLoggedIn ? "" : "error"} */}
          </div>
          <div className="input-wrapper">
            <label name="password"> Password </label>
            <input type="password" id="password" onChange={handlePasswordChange} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label name="remember-me">Remember me </label>
          </div>
           {/* PLACEHOLDER DUE TO STATIC SITE */}
          {/* <Link to="/user">
            <button className="sign-in-button" >Sign In</button>
          </Link> */}
            {/* SHOULD BE THE BUTTON BELOW  */}
              <button className="sign-in-button" >Sign In</button>
              {/* {AuthButton} */}
        </form>
      </div>
    </main>
  )

}

export default SignIn 