import { configureStore } from '@reduxjs/toolkit'
import { createAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit'


// Initial state 
const isLogged = false
const userFirstName = "vide"


// Action
export const logIn = createAction('logIn')
export const logOut = createAction('logOut');

export const setUserFirstName = createAction(
  'setUserFirstName',
  (name) => ({
    payload: { name: name },
  })
);

const userReducer = createReducer(userFirstName, (builder) =>
  builder
    .addCase(setUserFirstName, (state, action) => {
      return action.payload.name
    })
)

const logStateReducer = createReducer(isLogged,(builder) =>
  builder
    .addCase(logIn, (state) => {
      return true
    })
    .addCase(logOut, (state) => {
      return false
    })
)




export default configureStore({
  reducer: {
    user: userReducer,
    logState: logStateReducer

  },
})