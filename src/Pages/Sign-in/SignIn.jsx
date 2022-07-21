import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import { addItem } from '../../Services/LocalStorage'
import { getUserInfos, login } from '../../Services/callApi'
import { logIn } from '../../Store/store'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorConnection, setErrorConnection] = useState(false)
  const isLoggedIn = useSelector ((state) => state.logState)


  function RetrieveUsernameInput(event) {
    const inputValue = event.target.value
    setUsername(inputValue)
  }

  function RetrievePasswordInput(event) {
    const inputValue = event.target.value
    setPassword(inputValue)
  }

  function handleSubmit(event) {
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
          // console.log(response)
          const user = JSON.stringify(response.data.body) // The JSON.stringify() method converts a JavaScript value into a JSON string. 
          addItem('user', user)
        })
        dispatch(logIn()) // Change status is logged in store
        navigate("/user")

      }
    })
    .catch( function(error) {
      if(error.response) {
        console.log("this error: login not found")
        setErrorConnection(true)
        // console.log(errorConnection)
      }
    })
  }

  function checkIsLoggedIn() {
    if(isLoggedIn) {
      navigate("/user")
    }
  }

  useEffect(() => {
    checkIsLoggedIn()
  })

  return (
    <main className="main bg-dark">
      <div className='sign-in-content'>
        <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label name="username"> Username </label>
            <input type="text" id="username" onChange={RetrieveUsernameInput}  /> 
          </div>
          <div className="input-wrapper">
            <label name="password"> Password </label>
            <input type="password" id="password" onChange={RetrievePasswordInput} />
          </div>
          <p className='errormessage'>{errorConnection? "L'email ou/et le mot de passe est incorrecte. Veuillez recommencer": ""}</p>
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