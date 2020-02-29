import React, { Component } from 'react'
import { View, Text, Image, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Profile extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    let { navigation } = this.props
    return (
      <View>
        <Text> prop </Text>
        <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
