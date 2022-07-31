import { configureStore } from '@reduxjs/toolkit'
import { createAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit'
import { getItem } from '../Services/LocalStorage'

// Initial state 
const isLogged = checkTokenInLocalstorage()

const userInfos = {
  firstName: "",
  lastName : ""
}

// Create action
export const logIn = createAction('logIn')
export const logOut = createAction('logOut');


export const getUserData = createAction(
  'getUserData',
  (user) => ({
    payload: { user: user }, // should be an object
  })
);

export const changeUserName = createAction(
  'changeUserName',
  (user) => ({
    payload: { user: user }, // should be an object
  })
);


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

// Create reducer allowing to put user's infos in the store
const userReducer = createReducer(userInfos, (builder) =>
  builder
    .addCase(getUserData, (draft, action) => {
      return action.payload.user
    })
    .addCase(changeUserName, (draft, action) => {
      return action.payload.user
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

export default configureStore({
  reducer: {
    logState: logStateReducer,
    user: userReducer
  },
})
