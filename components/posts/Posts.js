import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import Posts from './Posts'
// import Spinner from "../common/Spinner";
import { getPosts } from '../../actions/postActions'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, loading } = this.props
    let postContent

    if (posts === null || loading) {
      postContent = <h2>Loading....</h2>
    } else {
      // console.log(this.props.posts);
      postContent = <Posts posts={posts} />

      // console.log(this.props);
    }

    return (
      <div className='feed'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
})

export default connect(mapStateToProps, { getPosts })(Posts)
