import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginAuth } from '../../actions/userAuthActions'

export class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: 'sean94@gmail.com',
      password: 'seancal123'
    }
    this.loginAuth = this.loginAuth.bind(this)
  }
  loginAuth = () => {
    // console.log(this.state)
    let { auth, navigation } = this.props
    let { email, password } = this.state
    // console.log(auth)

    // console.log(navigation)

    let userData = { email, password }
    this.props.loginAuth(userData)
    // console.log(this.props.auth.isAuthenticated)

    // console.log(this.props.auth.user.id)

    if (auth.isAuthenticated) {
      navigation.navigate('Profile', {
        screen: 'ProfileDetail',

        params: {
          feedId: this.props.auth.user.id
        }
      })
      console.log(auth)
    }
  }

  render() {
    let { auth, navigation } = this.props
    // console.log(auth)

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Email!'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          style={styles.textInput}
          placeholder='Enter Password!'
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {/* <Button onPress={() => navigation.push('Dashboard')} title='Login' /> */}
        <Button onPress={this.loginAuth} title='Login' />
        <Button onPress={() => navigation.push('Register')} title='Register' />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignContent: 'center',
    justifyContent: 'center'
  },
  textInput: {
    height: 40
  }
})

export default connect(mapStateToProps, { loginAuth })(LoginScreen)
