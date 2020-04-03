import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ChatFeed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Chat feed</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

const mapDispatchToProps = {}
const styles = StyleSheet.create({
  container: {
    height: '75%'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatFeed)
