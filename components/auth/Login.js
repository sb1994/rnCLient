import React, { Component } from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from "axios"
import { connect } from 'react-redux'
import { loginAuth } from '../../actions/userAuthActions'
class Login extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
    this.loginUser = this.loginUser.bind(this)
  }
  componentDidMount() {
    // console.log(this.props.auth)

    axios.get("https://pacific-coast-97072.herokuapp.com/api/users/").then(res => {
      console.log(res.data)

    }).catch(err => {
      console.log(err)

    })

    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate('Dashboard')
    }
  }
  componentWillUpdate(nextProps) {
    // console.log(nextProps)

    if (nextProps.auth.isAuthenticated) {
      nextProps.navigation.navigate('Dashboard')
      // navigation.push('Dashboard')
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    // console.log(nextProps)
  }
  loginUser() {
    let { email, password } = this.state
    console.log(this.state)

    this.props.loginAuth(email, password)
  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder='Enter Email!'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          style={{ height: 40 }}
          placeholder='Enter Password!'
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {/* <Button onPress={() => navigation.push('Dashboard')} title='Login' /> */}
        <Button onPress={this.loginUser} title='Login' />
        <Button onPress={() => navigation.push('Register')} title='Register' />
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { loginAuth })(Login)
