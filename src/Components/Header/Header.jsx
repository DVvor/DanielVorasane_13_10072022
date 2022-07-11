import './Header.css'
import { React } from 'react'
import { Link } from "react-router-dom";
import argentBankLogo from '../../Assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
// Pages
// import Home from '../../Pages/Home/Home'

/**
 * Create a component
 * @returns { JSX }
 */

function Header() { 
  return (
      <header>
        <nav className="main-nav">
          <Link to="/home" className='main-nav-logo' >
            <img alt='Argent Bank Logo' className='main-nav-logo-image' src={argentBankLogo} />
          </Link>
          <div>
            <Link className="main-nav-item" to="/signin">
              <FontAwesomeIcon icon={faCircleUser} />
              {/* <i class="fa fa-user-circle"></i> */}
              Sign In
            </Link>
          </div>
        </nav>
      </header>
  )
}

export default Header