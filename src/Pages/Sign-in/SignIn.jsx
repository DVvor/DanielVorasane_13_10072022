import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
    // let token = ""
    
    // Simple GET request using axios
    axios.post('http://localhost:3001/api/v1/user/login', body)
    .then(response => {
      // console.log(res)
      // token = res.data.body.token
      if (response.status === 200) {
        setToken(response.data.body.token)
        setIsLoggedIn(true)
        navigate("/user");
        // console.log(`logStatus: ${isLoggedIn}`)
        // console.log(`token: ${token}`)
      }
    })
    .catch( function(error) {
      if(error.response) {
        console.log("error: login not found")
        // console.log(`logStatus: ${isLoggedIn}`)
        setIsLoggedIn(false)
      }
    })

    // if(isLoggedIn) {
      
    // }
  }
  // console.log(`logStatus: ${isLoggedIn}`)
  // console.log(`token: ${token}`)
  

  //   if((username !=="steve@rogers.com") || (password !=="password456"))
  //   {
  //     setIsLoggedIn(false)
  //     console.log("messsage: l'email ou le mot de passe est incorrecte")
  //     alert("mauvais utilisateur")
  //   }
  //   else {
  //     setIsLoggedIn(true)
  //     console.log(username, password)
  //     alert("bon utilisateur")
  //   }
  


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