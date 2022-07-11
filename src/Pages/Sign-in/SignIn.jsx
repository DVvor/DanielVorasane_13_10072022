import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'


function SignIn() {
  
  return (
    <main className="main bg-dark">
      <div className='sign-in-content'>
        {/* <i className="fa fa-user-circle sign-in-icon"></i> */}
        <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" />

        <h1>Sign In</h1>

        <form>
          <div className="input-wrapper">
            <label name="username"> Username </label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label name="password"> Password </label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label name="remember-me">Remember me </label>
          </div>
           {/* PLACEHOLDER DUE TO STATIC SITE
          <a href="./user.html" className="sign-in-button">Sign In</a> */}
           {/* SHOULD BE THE BUTTON BELOW  */}
           <button className="sign-in-button">Sign In</button>
        </form>
      </div>
    </main>
  )

}

export default SignIn 