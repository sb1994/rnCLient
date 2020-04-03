import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ProfileEditScreen extends Component {
  render() {
    let { auth, route } = this.props
    // console.log(route.params.data)

    return (
      <View>
        <Text> ProfileEditScreen </Text>
        <Text> {auth.user.name} </Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)
