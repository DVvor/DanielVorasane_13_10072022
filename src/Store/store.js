import { configureStore } from '@reduxjs/toolkit'
import { createAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit'
import { getItem } from '../Services/LocalStorage'

// Initial state 
const isLogged = checkTokenInLocalstorage()
// const hasFirstName = retrieveFisrtNameLocalStorage()
// const hasLastName = RetrieveLastNameLocalStorage()
const hasUserInfos = retrieveUserInfos()

// Create action
export const logIn = createAction('logIn')
export const logOut = createAction('logOut');

// export const firstName = createAction('hasFirstName')
// export const lastName = createAction('hasLastName')
export const user = createAction('user')

// Create reducer allowing to put the state in the store
const logStateReducer = createReducer(isLogged,(builder) =>
  builder
    .addCase(logIn, () => {
      return true
    })
    .addCase(logOut, () => {
      return false
    })
)

// const userfirstNameReducer = createReducer(hasFirstName,(builder) =>
//   builder
//     .addCase(firstName, (action) => {
//       return action.payload.name
//     })
// )

const userReducer = createReducer(hasUserInfos,(builder) =>
  builder
    .addCase(user, (action) => {
      return action.payload.name
    })
)

// Retrieve token in local storage
function checkTokenInLocalstorage() {
  const token = getItem('token')

  if (token) {
    return true
  } else {
    return false
  }
}

//Retrieve user infos in local storage
// function retrieveFisrtNameLocalStorage() {
//   const userInfos = JSON.parse(getItem('user'))
//   if (userInfos) {
//     return userInfos.firstName
//   }
// }

function retrieveUserInfos() {
  const userInfos = JSON.parse(getItem('user'))
  if (userInfos) {
    return userInfos
  } else {
    return ""
  }
}

export default configureStore({
  reducer: {
    // userfirstName: userfirstNameReducer,
    // userLasttName: userLastNameReducer,
    logState: logStateReducer,
    user: userReducer

  },
})




// const LastName = ""


// export const setUserFirstName = createAction(
//   'setUserFirstName',
//   (name) => ({
//     payload: { userfirstName: name },
//   })
// );

// export const setUserLastName = createAction(
//   'setUserLastName',
//   (name) => ({
//     payload: { userLastName: name },
//   })
// );



