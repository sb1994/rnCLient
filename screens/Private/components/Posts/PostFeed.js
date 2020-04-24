import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../../../actions/postActions'
import PostCard from './PostCard'

class PostFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      posts: this.props.posts.posts
    }
  }

  componentWillMount() {
    let { feedId } = this.props
    this.props.getPosts(feedId)
  }
  componentDidMount() {
    let { posts } = this.props.posts
    // console.log(posts)

    this.setState({
      loading: false,
      posts: posts
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.posts.posts)
  //   let { posts } = nextProps.posts

  //   // console.log(posts)

  //   // console.log('Hello')
  //   // if (posts.length > 0 || posts === null) {
  //   //   this.setState({
  //   //     posts: posts
  //   //   })
  //   //   console.log('Posts exist')
  //   // } else {
  //   //   this.setState({
  //   //     posts: posts
  //   //   })
  //   // }
  // }
  componentDidUpdate(prevProps) {
    console.log(prevProps)
  }

  render() {
    // console.log(this.props.posts)
    let { posts } = this.props.posts
    // console.log(posts)

    // let { posts } = this.state
    let { loading } = this.state
    // console.log(loading)

    // console.log(this.props.posts)

    return (
      <View style={styles.container}>
        {/* <Text>Hello</Text> */}
        {loading ? (
          <Text>loading..</Text>
        ) : (
          <FlatList
            inverted
            data={posts}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <PostCard post={item} />}
          />
          // <Text>Not Working</Text>
        )}
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
