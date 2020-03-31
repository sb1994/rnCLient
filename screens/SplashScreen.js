import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import axios from '../axios'

import jwt_decode from 'jwt-decode'

import { setLoggedUser, logoutUser } from '../actions/userAuthActions'

class SplashScreen extends Component {
  componentDidMount() {
    let { auth, navigation } = this.props

    AsyncStorage.getItem('token', (err, result) => {
      // console.log(result)
      if (result === null) {
        console.log('token doent exist')
        // this.setState({
        //   tokenAuth: false
        // })
        // console.log(navigation)

        navigation.push('Login')
      } else {
        // AsyncStorage.removeItem('token')
        // console.log(result)
        const decoded = jwt_decode(result)
        // console.log(decoded)

        axios.defaults.headers.common['Authorization'] = `Bearer ${result}`

        // console.log(axios.defaults)

        this.props.setLoggedUser(decoded)

        // // console.log(decoded)
        // this.setState({
        //   tokenAuth: true
        // })
        navigation.push('Profile', {
          params: {
            feedId: this.props.auth.user.id
          }
        })
      }
    })

    // !auth.isAuthenticated
    //   ?
    //   :

    // console.log(navigation)
    // navigation.push('Login')
    // console.log(this.props.auth)
  }
  // componentDidUpdate(prevProps) {
  //   if (this.props.auth.isAuthenticated) {
  //     console.log('authenticaed')
  //     this.props.navigation.push('Profile')
  //   }
  // }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello this is my Text</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { setLoggedUser })(SplashScreen)
const styles = StyleSheet.create({
  container: {
    marginTop: 30
  }
})
