import './User.css'
// import { useSelector } from 'react-redux'
// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

function User() {
  // const userFirstname = useSelector ((state) => state.userfirstName)
  // const [userFirstname, setuserFirstname] = useState("");
  // const [userLastname, setuseLastname] = useState("");
  const isLoggedIn = useSelector ((state) => state.logState)
  const userFirstname = useSelector ((state) => state.user.firstName)
  const userLastname = useSelector ((state) => state.user.lastName)
  

  console.log(isLoggedIn, userFirstname)

  if(isLoggedIn) {

    return (
      <main className="main-user bg-dark">
        <div className="header">
          <h1>Welcome back<br />{`${userFirstname} ${userLastname}`}</h1>
          <button className="edit-button">Edit Name</button>
        </div>
        {/* <h2 className="sr-only">Accounts</h2> */}
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    )
  }


}

export default User 