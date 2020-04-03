import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ChatListItem extends Component {
  render() {
    let { message, auth } = this.props

    if (message.user._id === auth.user._id) {
      return (
        <View style={styles.authContainer}>
          <Image
            source={{ uri: message.user.profile_pic }}
            style={styles.messageProfilePic}
          />
          <View style={styles.textContainer}>
            <Text>{message.text}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: message.user.profile_pic }}
            style={styles.messageProfilePic}
          />
        </View>
      )
    }
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    width: '50%'
  },
  authContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    margin: 10,
    width: '60%',
    backgroundColor: 'orange'
  },
  textContainer: {
    // width: '50%'
  },
  messageProfilePic: {
    height: 50,
    width: 50
  }
})

export default connect(mapStateToProps, {})(ChatListItem)
