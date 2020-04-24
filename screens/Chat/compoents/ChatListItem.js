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
          <View>
            <Image
              source={{ uri: message.user.profile_pic }}
              style={styles.messageProfilePic}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 18, color: '#ffd' }}>
              {message.user.name}
            </Text>
            <Text style={{ color: '#fff' }}>{message.text}</Text>
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
          <View style={(styles.textContainer, { marginLeft: 10 })}>
            <Text style={{ fontSize: 18, color: '#ffd' }}>
              {message.user.name}
            </Text>
            <Text style={{ color: '#fff' }}>{message.text}</Text>
          </View>
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
    width: '60%',
    borderRadius: 50,
    backgroundColor: '#3a6bc3',
    padding: 10
  },
  authContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    margin: 10,
    backgroundColor: '#2abbac',
    padding: 10,
    marginRight: 50,
    borderRadius: 50
  },
  textContainer: {
    // width: '50%'
    // flexGrow: 1,
    flex: 1,
    paddingLeft: 10
  },
  textStyle: {
    // color:'#'
  },

  messageProfilePic: {
    height: 50,
    width: 50,
    borderRadius: 50
  }
})

export default connect(mapStateToProps, {})(ChatListItem)
