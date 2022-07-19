import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'
// import axios from 'axios'
import { login } from '../../Services/callApi'
import { logIn } from '../../Store/store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItem } from '../../Services/LocalStorage'
import { getUserInfos } from '../../Services/callApi'

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
        addItem('token', token)
        getUserInfos('http://localhost:3001/api/v1/user/profile', {}, token)
        .then(response => {
          const user = JSON.stringify(response.data.body) // The JSON.stringify() method converts a JavaScript value into a JSON string. 
          addItem('user', user)
        })
        dispatch(logIn())
        navigate("/user")
      }
    })
    .catch( function(error) {
      if(error.response) {
        console.log("error: login not found")
      }
    })
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
            {/* style error css */}
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
              <button className="sign-in-button" >Sign In</button>
        </form>
      </div>
    </main>
  )

}

export default SignIn 