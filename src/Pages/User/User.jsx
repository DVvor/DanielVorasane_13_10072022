import './User.css'
// import { useSelector } from 'react-redux'
// import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserInfos } from '../../Services/callApi'
import { getItem } from '../../Services/LocalStorage'

function User() {
  // const userFirstname = useSelector ((state) => state.userfirstName)
  // const [userFirstname, setuserFirstname] = useState("");
  // const [userLastname, setuseLastname] = useState("");
  // const isLoggedIn = useSelector ((state) => state)
  // const userInfos = useSelector ((state) => state.user)
  // console.log(userInfos)

  const userFirstname = useSelector ((state) => state.user.firstName)
  const userLastname = useSelector ((state) => state.user.lastName)
  const dispatch = useDispatch()

  const [formEditName, setFormEditName] = useState(false);
  const [firstName, setFirstName] = useState(userFirstname);
  const [lastName, setLastName] = useState(userLastname);

  function checkUserInfosIsLoaded() {
    const token = getItem('token')
    let user = ""
    getUserInfos('http://localhost:3001/api/v1/user/profile', {}, token)
      .then (response => {
        user = response.data.body 
        })
      if(user) {
        alert("chargé")
        return true
      } else {
        return false
      }

    // .catch( function(error) {
    //   if(error.response) {
    //     console.log("error: login not found")
    //   }
    // })
  }

  function handleClickEditName() {
    console.log(formEditName)
    setFormEditName(true)
  }

  function closeEdit() {
    setFormEditName(false)
  }

  function saveEdit() {
    setFormEditName(false)
    dispatch(firstName)
    dispatch(lastName)
  }

   
  useEffect(() => {
    //  checkUserInfosIsLoaded()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  });

    if(!checkUserInfosIsLoaded() === true) {

      return (
        <main className="main-user bg-dark">
          <div className="header">
            <h1>Welcome back<br />{`${userFirstname} ${userLastname}`}</h1>
            { !formEditName ?
              <button className="edit-button" onClick={handleClickEditName}>Edit Name</button>
            : "" }
            { formEditName ?
              <form className='editname-form-bl' >
                <div className="editname-form">
                  <input type="text" className="input-editname" id="firstname" placeholder={userFirstname} onChange={(event) => {setFirstName(event.target.value)}}/>
                  <button className='btn-editname' onClick={saveEdit}>Save</button>
                </div>
                <div className="editname-form">
                  <input type="text" className="input-editname" id="lastname" placeholder={userLastname} onChange={(event) => {setLastName(event.target.value)}}/>
                  <button className='btn-editname' onClick={closeEdit}>Cancel</button>
                </div>
              </form>
            : "" }
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