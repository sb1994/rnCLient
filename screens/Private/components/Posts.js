import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import PostFeed from './Posts/PostFeed'
import PostForm from './Posts/PostForm'

class Posts extends Component {
  render() {
    let { feedId } = this.props

    // console.log(feedId)

    return (
      <View style={styles.container}>
        <PostForm feedId={feedId} />
        <PostFeed feedId={feedId} />
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
    margin: 10,
    backgroundColor: '#fff'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
