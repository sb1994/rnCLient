import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateUser } from '../../actions/userAuthActions'

class ProfileEditScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      updated_profile_pic: null,
      profilePicURL: ''
    }
    this.input = React.createRef()
  }
  componentWillMount() {
    let {
      bio,
      location,
      githubusername,
      profile_pic,
      status,
      website
    } = this.props.auth.user
    this.setState({
      bio,
      location,
      githubusername,
      profile_pic,
      status,
      website
    })
  }
  componentDidMount() {
    console.log(this.state)
  }
  handleUserUpdate = () => {
    let {
      bio,
      location,
      githubusername,
      profile_pic,
      status,
      website
      // profile_pic
    } = this.state

    let userData = {
      bio,
      location,
      githubusername,
      profile_pic,
      status,
      website
      // profile_pic
    }

    this.props.updateUser(userData)
    // console.log(this.state)
  }

  render() {
    let { auth, route, navigation } = this.props

    // let { user } = console.log(navigation, auth)

    // console.log(route.params.data)

    return (
      <View style={styles.container}>
        <Text> ProfileEditScreen </Text>
        <View style={styles.inputContainer}>
          <Text>Bio:</Text>
          <TextInput
            multiline
            value={this.state.bio}
            onChangeText={bio => this.setState({ bio })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Location:</Text>
          <TextInput
            value={this.state.location}
            onChangeText={location => this.setState({ location })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Status:</Text>
          <TextInput
            value={this.state.status}
            onChangeText={status => this.setState({ status })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Github Username:</Text>
          <TextInput
            value={this.state.githubusername}
            onChangeText={githubusername => this.setState({ githubusername })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Website:</Text>
          <TextInput
            value={this.state.website}
            onChangeText={website => this.setState({ website })}
          />
        </View>
        <Button title='Update Profile' onPress={this.handleUserUpdate} />
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
    flex: 1
  }
})

export default connect(mapStateToProps, { updateUser })(ProfileEditScreen)
