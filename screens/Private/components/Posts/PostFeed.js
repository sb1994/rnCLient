import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../../../actions/postActions'
import PostCard from './PostCard'

class PostFeed extends Component {
  componentDidMount() {
    let { feedId } = this.props
    this.props.getPosts(feedId)
  }

  render() {
    // console.log(this.props.posts)
    let { posts } = this.props.posts
    // console.log(posts)

    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <PostCard post={item} />}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
})

const mapDispatchToProps = {}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff'
  }
})

export default connect(mapStateToProps, { getPosts })(PostFeed)
