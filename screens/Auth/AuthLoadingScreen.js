import React, { Component } from 'react'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  }
})
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class AuthLoadingScreen extends Component {
  render() {
    return (
      <View>
        <Text> AuthLoadingScreen </Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
