import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateChatId } from '../../../actions/chatActions'
export class ConnectedUserListItem extends Component {
  render() {
    let { user } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textUsername}> {user.name}</Text>
        </View>
        <Image source={{ uri: user.profile_pic }} style={styles.profilePic} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

const styles = StyleSheet.create({
  textUsername: {
    color: '#fff'
  },
  container: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePic: {
    height: 30,
    width: 30
  }
})

export default connect(mapStateToProps, { mapDispatchToProps })(
  ConnectedUserListItem
)
