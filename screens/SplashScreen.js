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

        navigation.push('Login')
      } else {
        const decoded = jwt_decode(result)

        axios.defaults.headers.common['Authorization'] = `Bearer ${result}`

        this.props.setLoggedUser(decoded)
        navigation.push('Profile', {
          params: {
            feedId: this.props.auth.user.id
          }
        })
      }
    })
  }

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
