import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Comment extends Component {
  render() {
    let { comment } = this.props
    return (
      <View style={styles.commentContainer}>
        <View style={styles.profilePicContainer}>
          <Image
            style={styles.profile_pic}
            source={{ uri: comment.user.profile_pic }}
          />
        </View>
        <View style={styles.commentBody}>
          <Text>{comment.text}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}
const styles = StyleSheet.create({
  commentContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderTopColor: 'red',
    flex: 1,
    flexDirection: 'row'
  },
  profilePicContainer: {
    paddingRight: 10
  },
  profile_pic: {
    height: 50,
    width: 50,
    padding: 12
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
