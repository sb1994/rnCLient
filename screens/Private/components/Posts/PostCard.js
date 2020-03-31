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
              title='X'
              onPress={() => {
                // console.log(post.comments)

                this.setState({ openModal: !this.state.openModal })
              }}
            />
          </View>
          <ScrollView>
            <View style={styles.modalBody}>
              <FlatList
                data={comments}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <Comment comment={item} />}
              />

              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder='How is the Corona Feeling'
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                />
                <Button
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
              <Text>{post.user.name}</Text>
            </View>
          </View>
          <View style={styles.cardHeaderControls}>
            {post.feedId === auth.user.id ? (
              <Button title='X' onPress={this.handlePostDelete} />
            ) : null}
          </View>
        </View>
        <View style={styles.cardBody}>
          {post.text === '' ? null : (
            <View>
              <Text>{post.text}</Text>
            </View>
          )}
          {post.postImgURL === '' ? null : (
            <Image style={styles.post_img} source={{ uri: post.postImgURL }} />
          )}
        </View>
        <View style={styles.cardFooter}>
          <Button
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
  cardContainer: {
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 5
  },
  cardHeader: {
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 5,
    flexDirection: 'row'
  },
  cardHeaderDetails: {
    width: '80%',
    flexDirection: 'row'
  },
  cardHeaderControls: {
    width: '20%'
  },
  userPostProfilePic: {
    width: 50,
    height: 50
  },
  cardBody: {
    borderWidth: 1,
    borderColor: 'red'
  },
  cardFooter: {
    borderWidth: 1,
    borderColor: 'purple'
  },
  post_img: { height: 100, width: 100 }
})

export default connect(mapStateToProps, { deletePost, addComment })(PostCard)
