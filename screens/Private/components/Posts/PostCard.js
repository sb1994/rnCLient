import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Modal,
  FlatList,
  TextInput,
  Alert,
  ScrollView
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deletePost, addComment } from '../../../../actions/postActions'
import Comment from './Comment'
class PostCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openModal: false,
      text: ''
    }
  }
  handleCommentCreate = () => {
    let { post, auth } = this.props
    let { text } = this.state

    if (text === '') {
      Alert.alert('Please Enter Text')
    } else {
      let newComment = {
        post: post._id,
        text
      }
      // console.log(this.props.post.comments)

      this.props.addComment(newComment)

      this.setState({
        text: ''
      })
    }
  }

  handlePostDelete = () => {
    let { post } = this.props
    console.log(`Post: ${post._id} Deleted`)

    this.props.deletePost(post._id, post._id)
  }
  render() {
    let { post, auth } = this.props

    let { comments } = post

    return (
      <View style={styles.cardContainer}>
        <Modal visible={this.state.openModal} animationType='slide'>
          <View style={styles.modalHeader}>
            <Button
              backgroundColor='#3a6bc3'
              title='X'
              onPress={() => {
                // console.log(post.comments)

                this.setState({ openModal: !this.state.openModal })
              }}
            />
          </View>
          <ScrollView>
            <View style={styles.modalBody}>
              <View style={{ maxHeight: '85%' }}>
                <FlatList
                  data={comments}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => <Comment comment={item} />}
                />
              </View>

              <View style={styles.commentInputGroup}>
                <TextInput
                  style={styles.textInput}
                  placeholder='Say what you think'
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                />
                <Button
                  backgroundColor='#3a6bc3'
                  title='Add Comment'
                  onPress={this.handleCommentCreate}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderDetails}>
            <Image
              source={{ uri: post.user.profile_pic }}
              style={styles.userPostProfilePic}
            />
            <View>
              <Text style={{ color: 'white' }}>{post.user.name}</Text>
            </View>
          </View>
          <View style={styles.cardHeaderControls}>
            {post.feedId === auth.user._id ? (
              <Button
                title='X'
                onPress={this.handlePostDelete}
                color='red'
                style={{ backgroundColor: 'red' }}
              />
            ) : null}
          </View>
        </View>
        <View style={styles.cardBody}>
          {post.text === '' ? null : (
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ color: 'black' }}>{post.text}</Text>
            </View>
          )}
          {post.postImgURL === '' ? null : (
            <Image style={styles.post_img} source={{ uri: post.postImgURL }} />
          )}
        </View>
        <View style={styles.cardFooter}>
          <Button
            backgroundColor='#3a6bc3'
            title='View Comments'
            onPress={() => this.setState({ openModal: !this.state.openModal })}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

const styles = StyleSheet.create({
  modalInputBtn: {
    backgroundColor: '#3a6bc3'
  },
  commentInputGroup: {
    padding: 10
  },

  cardContainer: {
    borderColor: '#2abbac',
    borderWidth: 1,
    marginBottom: 5
    // padding: 10
    // borderRadius: 30
  },
  cardHeader: {
    backgroundColor: '#2abbac',
    // borderWidth: 1,
    // marginBottom: 5,
    flexDirection: 'row'
  },
  cardHeaderDetails: {
    width: '80%',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 10
  },
  cardHeaderControls: {
    width: '20%'
  },
  userPostProfilePic: {
    width: 50,
    height: 50
  },
  cardBody: {
    paddingTop: 5,
    paddingBottom: 5
  },
  cardFooter: {},
  post_img: { height: 100, width: 100 }
})

export default connect(mapStateToProps, { deletePost, addComment })(PostCard)
