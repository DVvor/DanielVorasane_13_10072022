import './Errorpage.css';
import React from 'react'


/**
 * Create a component
 * @returns { JSX }
 */

// Error page
function Errorpage() {
    return (
    <main className='main'>
        <div className="bl-errorpage">
            <span className='error-number'>404</span>
            <p className='message-errorpage'>Oups! La page que vous demandez n'existe pas.</p>
        </div>

        {/* <div className="btn-return">
            <Link to="/About" className='link-return-home'>Retourner sur la page d’accueil</Link>
        </div> */}
    </main>
    )

}

export default Errorpage