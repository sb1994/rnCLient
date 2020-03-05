import axios from 'axios'
import setUserToken from '../utils/setUserToken'
import jwt_decode from 'jwt-decode'
import { AsyncStorage } from 'react-native'

import * as types from './action_types'

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => console.log('hello'))

    .catch(err =>
      dispatch({
        type: types.FAIL_AUTH,
        payload: err.response.data
      })
    )
}

export const startAuth = () => {
  return {
    type: types.START_AUTH
  }
}
export const successAuth = token => {
  return {
    type: types.SUCCESS_AUTH,
    token: token
  }
}
export const failAuth = error => {
  return {
    type: types.FAIL_AUTH,
    error: error
  }
}
export const setLoggedUser = decoded => {
  return {
    type: types.SET_LOGGED_USER,
    payload: decoded
  }
}
export const loginAuth = (email, password) => {
  console.log(email, password)

  return dispatch => {
    // dispatch(startAuth())
    axios
      .post('https://pacific-coast-97072.herokuapp.com/api/users/login', {
        // .post('http://192.168.0.214:5000/api/users/login', {
        // .post('http://10.0.2.2:5000/api/users/login', {
        email: email,
        password: password
      })
      .then(result => {
        if (result.data.token !== "") {

          const token = result.data.token
          AsyncStorage.setItem('token', token)
          const decoded = jwt_decode(token)
          setUserToken(token)
          dispatch(setLoggedUser(decoded))
        }
        console.log(result)


        // console.log(result)


        // //sets the expirey date
        // const expire = new Date(new Date().getTime() + 10000 * 1000)
        // console.log(token)
        // console.log(result.data)

        //stores the the token and the expireation date in the browser
        //as a cookie
        // localStorage.setItem('token', token)
        // console.log(decoded)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const registerAuth = (password, name, email) => {
  //alert that the register has started
  return dispatch => {
    dispatch(startAuth())
    // console.log(avatar);

    axios
      .post('api/users/register/', {
        password,
        name,
        email
      })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
// export const logoutUser = () => dispatch => {
//   // console.log(result)
//   // Remove token from localStorage
//   // localStorage.removeItem('token')
//   // // Remove auth header for future requests
//   // setUserToken(false)
//   // // Set current user to {} which will set isAuthenticated to false
//   // dispatch(setLoggedUser({}))

//   axios
//     .post('api/users/logout')
//     .then(result => {
//       console.log(result)
//       // Remove token from localStorage
//       localStorage.removeItem('token')
//       // Remove auth header for future requests
//       setUserToken(false)
//       // Set current user to {} which will set isAuthenticated to false
//       dispatch(setLoggedUser({}))
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }
