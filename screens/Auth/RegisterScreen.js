import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerAuth } from '../../actions/userAuthActions'

export class RegisterScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      name: ''
    }
    this.handleRegisterUser = this.handleRegisterUser.bind(this)
  }

  handleRegisterUser() {
    let { password, name, email } = this.state

    password === '' || name === '' || email === ''
      ? Alert.alert('Please Fill All Fields')
      : this.props.registerAuth(password, name, email)
  }

  render() {
    let { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text> Register Screen </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Enter Name!'
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
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
        <Button onPress={this.handleRegisterUser} title='Register' />
        <Button onPress={() => navigation.push('Login')} title='Login' />
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10
  },
  textInput: {
    marginBottom: 10
  }
})

export default connect(mapStateToProps, { registerAuth })(RegisterScreen)
