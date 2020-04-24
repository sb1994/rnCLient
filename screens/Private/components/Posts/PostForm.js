import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Image
} from 'react-native'
import PropTypes from 'prop-types'
import { addPost } from '../../../../actions/postActions'
import { connect } from 'react-redux'
import { storage } from '../../../../firebase/index'

import * as ImagePicker from 'expo-image-picker'
class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      post_pic: null,
      postImgURL: ''
    }
  }

  componentDidMount() {
    // console.log(this.props)
  }
  handleCreatePost = () => {
    let { auth, feedId } = this.props
    let { text, post_pic } = this.state
    console.log(feedId)

    // if (feedId === undefined) {
    //   console.log('FeedId Not Set')
    // } else {
    //   console.log('Auth Id will be used')
    // }

    console.log('post added')
    console.log(auth)
    if (post_pic === null && text === '') {
      Alert.alert('Cannot Create Post with No Input')
    } else if (post_pic === null && text !== '') {
      console.log('Creating Text Post')
      const newPost = {
        text,
        postImgURL: '',
        feedId: feedId
      }
      console.log(newPost)
      this.props.addPost(newPost)
      this.setState({
        text: ''
      })
    } else if (post_pic !== null) {
      console.log('Creating Text And Image Post')

      // let blob = this.

      const newPost = {
        text: text,
        post_pic: post_pic,
        postImgURL: '',
        feedId
      }

      console.log(newPost)

      const uploadTask = storage
        .ref(`post_imgs/${newPost.post_pic._data.name}`)
        .put(newPost.post_pic)

      // console.log(uploadTask)

      uploadTask.on(
        'state_changed',
        snapshot => {
          // console.log(snapshot)
        },
        error => {
          // console.log(error)
        },
        () => {
          console.log('IMAGE UPLOADED')
          //what happens whent the postIm has finished uploading
          storage
            .ref('post_imgs')
            .child(newPost.post_pic._data.name)
            .getDownloadURL()
            .then(url => {
              let postImgURL = url
              // console.log(postImgUrl);

              // console.log(postImgUrl);
              newPost.postImgURL = postImgURL
              // console.log(newPost)
              this.props.addPost(newPost)
              // console.log(this.state)

              this.setState({
                text: '',
                post_pic: null,
                postImgUrl: '',
                postImgURL: ''
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      )
    }
  }
  handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync()

    if (!result.cancelled) {
      const response = await fetch(result.uri)
      const blob = await response.blob()
      this.setState({
        post_pic: blob,
        postImgURL: result.uri
      })
    } else {
      this.setState({
        post_pic: null,
        postImgURL: ''
      })
    }
  }
  handleCameraUpload = async () => {
    let result = await ImagePicker.launchCameraAsync()

    if (!result.cancelled) {
      this.setState({
        post_pic: result,
        postImgURL: result.uri
      })
    } else {
      this.setState({
        post_pic: null,
        postImgURL: ''
      })
    }
  }

  render() {
    let { postImgURL } = this.state
    return (
      <View style={styles.container}>
        {postImgURL !== '' ? (
          <Image
            style={styles.uploadImagePreview}
            source={{ uri: postImgURL }}
          />
        ) : null}
        <TextInput
          style={styles.textInput}
          placeholder='How is the Corona Feeling'
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <View style={styles.inputContainer}>
          <Button
            style={styles.input}
            onPress={this.handleImageUpload}
            title='Upload Image'
          />
          <Button
            onPress={this.handleCameraUpload}
            title='Take Picture'
            style={{ maRight: 10 }}
          />
          <Button onPress={this.handleCreatePost} title='Add Post' />
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
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
    // flexDirection: 'row'
  },
  inputContainer: {
    borderColor: '#2abbac',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: { paddingHorizontal: 20 },
  uploadImagePreview: {
    height: 300,
    width: 300
  }
})

export default connect(mapStateToProps, { addPost })(PostForm)
