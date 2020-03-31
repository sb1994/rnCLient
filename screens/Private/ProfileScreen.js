import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import PropTypes from 'prop-types'
import PostForm from './components/Posts/PostForm'
import PostFeed from './components/Posts/PostFeed'
import ProfileDetail from './components/ProfileDetail'
import { connect } from 'react-redux'

export class ProfileScreen extends Component {
  componentDidMount() {
    // console.log(this.props)
  }
  render() {
    // console.log(user.profile_pic)

    let { user } = this.props.auth
    let { navigation, route } = this.props
    // console.log(route)

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileDetail navigation={navigation} />
            <PostForm feedId={user.id} />
            <PostFeed feedId={user.id} />
          </ScrollView>
        </TouchableWithoutFeedback>
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
    marginTop: 5,
    flex: 1
  },
  profile_img: {
    height: 50,
    width: 50
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
