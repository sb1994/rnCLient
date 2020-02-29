import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { registerAuth } from "../../actions/userAuthActions"
import { connect } from 'react-redux'
class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {

      email: "",
      password: "",
      name: ""
    }
  }

  registerUser() {
    let { email, password, name } = this.state
    this.props.registerUser(email, password, name)
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
          placeholder='Enter Name'
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />


        <TextInput
          style={{ height: 40 }}
          placeholder='Enter Password!'
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {/* <Button onPress={this.loginUser} title='Login' /> */}
        <Button onPress={() => navigation.push('Login')} title='Login' />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

export default connect(
  mapStateToProps,
  { registerAuth }
)(Register)
