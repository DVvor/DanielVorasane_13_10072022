import './User.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { changeUserInfos } from '../../Services/callApi'
import { getItem } from '../../Services/LocalStorage'
import { changeUserName } from '../../Store/store'

function User() {
  const userFirstName = useSelector ((state) => state.user.firstName)
  const userLastName = useSelector ((state) => state.user.lastName)
  const dispatch = useDispatch()

  const [formEditName, setFormEditName] = useState(false);
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [error, setError] = useState(false);
  let validInput = /^[a-zA-ZÀ-ÿ ]+$/ // Regex 
  
  function ClickEditName() {
    setFormEditName(true)
  }

  function closeEdit(event) {
    // event.preventDefault();
    if(error) {
      setFormEditName(true)
    } else {
      setFormEditName(false)
    }
  }

  function saveEdit() {
    let userInfos = {
      firstName: firstName,
      lastName : lastName
    }

    if (!validInput.test(firstName) || 
      !validInput.test(lastName)|| 
      firstName.length === 0 || 
      lastName.length === 0) {
      setError(true)
    } else {
      setFormEditName(false)
      setError(false)
      const token = getItem('token')
      changeUserInfos('http://localhost:3001/api/v1/user/profile', userInfos, token)
      dispatch(changeUserName(userInfos))
    }
  }

  return (
    <main className="main-user bg-dark">
      <div className="header">
        <h1>Welcome back<br />{`${userFirstName} ${userLastName}`}</h1>
        { !formEditName ?
          <button className="edit-button" onClick={ClickEditName}>Edit Name</button>
        : "" }
        { formEditName ?
          <form action="" className='editname-form-bl' >
            <div className="editname-form">
              <input 
              required type="text" 
              name='firstname' 
              id="firstname" 
              className= "input-editname"
              // className={!error ? "input-editname" : " input-editname error"}
              placeholder={userFirstName}
              onChange={
                (event) => {setFirstName(event.target.value)} }
              />
              <button type='button' className='btn-editname' onClick={saveEdit}>Save</button>
            </div>
            <div className="editname-form">
              <input required type="text" name='lasttname' className="input-editname" id="lastname" placeholder={userLastName}
              onChange={
                (event) => {setLastName(event.target.value)} }/>
              <button type="button" className='btn-editname' onClick={closeEdit}>Cancel</button>
            </div>
          </form>
        : "" }
        { error ?
      <p className='error'>Le champs du nom et/ou prénom n'est pas valide. Veuillez recommencer </p>
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

export default User 