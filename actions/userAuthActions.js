import axios from '../axios'
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
export const cancelFriendRequest = user_id => dispatch => {
  // console.log(user_id);
  dispatch({
    type: types.CANCEL_FRIEND_REQUEST
  })
  axios
    .post(`/api/users/friends/cancel/${user_id}`, user_id)
    .then(res => {
      console.log(res.data)
    })

    .catch(err =>
      dispatch({
        type: types.FAIL_ADD_FRIEND,
        payload: err.response.data
      })
    )
}
export const acceptFriendRequest = requesterId => dispatch => {
  axios
    .post(`/api/users/friends/accept/${requesterId}`)
    .then(result => {
      // dispatch(setLoggedUser(result.data));
      console.log(result.data)
    })
    .catch(err => {
      console.log(err)
    })
  // console.log(requesterId);
  return {
    type: types.ACCEPT_FRIEND_REQUEST
  }
  // axios
  //   .post(`/api/users/friends/add/${user_id}`, user_id)
  //   .then(res => {
  //     dispatch({
  //       type: types.ADD_FRIEND,
  //       payload: res.data
  //     });
  //     console.log(res.data);
  //   })

  //   .catch(err =>
  //     dispatch({
  //       type: types.FAIL_ADD_FRIEND,
  //       payload: err.response.data
  //     })
  //   );
  // return {
  //   type: types.ADD_FRIEND
  // };
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
export const loginAuth = userData => {
  // console.log()
  let { email, password } = userData

  return dispatch => {
    // dispatch(startAuth())
    axios
      .post('/api/users/login', {
        // .post('http://192.168.0.214:5000/api/users/login', {
        // .post('http://10.0.2.2:5000/api/users/login', {
        email: email,
        password: password
      })
      .then(result => {
        if (result.data.token !== '') {
          const token = result.data.token
          AsyncStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const decoded = jwt_decode(token)
          setUserToken(token)
          dispatch(setLoggedUser(decoded))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const getCurrentUser = () => {
  return dispatch => {
    axios
      .get('/api/users/current')
      .then(result => {
        console.log(result.data.user)

        dispatch(setLoggedUser(result.data.user))
        // console.log(result.data);
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const getSearchedUser = id => {
  return dispatch => {
    axios
      .get(`/api/users/${id}`)
      // .get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then(result => {
        // dispatch(setLoggedUser(result.data.user))
        dispatch(setSearchedUser(result.data.user[0]))
        // console.log(result.data.user[0])
        // dispatch(setSearchedUser(result.data.user[0]))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const setSearchedUser = user => {
  return {
    type: types.SET_SEARCHED_USER,
    payload: user
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
export const addFriend = user_id => dispatch => {
  console.log(user_id)
  // dispatch({
  //   type: types.ADD_FRIEND
  // })
  // axios
  //   .post(`/api/users/friends/add/${user_id}`, user_id)
  //   .then(res => {
  //     console.log(res.data)
  //   })

  //   .catch(err =>
  //     dispatch({
  //       type: types.FAIL_ADD_FRIEND,
  //       payload: err.response.data
  //     })
  //   )
  // return {
  //   type: types.ADD_FRIEND
  // }
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
