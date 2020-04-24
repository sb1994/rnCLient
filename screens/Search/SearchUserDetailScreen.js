import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSearchedUser, addFriend } from '../../actions/userAuthActions'
import PostFeed from '../Private/components/Posts/PostFeed'
import PostForm from '../Private/components/Posts/PostForm'
import SocialDetail from '../Private/components/SocialDetail'

class SearchUserDetailScreen extends Component {
  componentWillMount() {
    let { route } = this.props
    let { id } = route.params
    // console.log(id)
    this.props.getSearchedUser(id)
  }

  handleFriendRequest = () => {
    this.props.addFriend(this.props.auth.searchedUser._id)
  }
  render() {
    let { route } = this.props
    let { id } = route.params
    let { auth } = this.props
    // console.log(auth.searchedUser)
    let { searchedUser, user } = auth

    return (
      <View style={styles.profileScreenContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.profile_pic}
              source={{ uri: searchedUser.profile_pic }}
            />
            <Text style={styles.profileNameText}>{searchedUser.name}</Text>

            <SocialDetail user={searchedUser} />
          </View>
          <PostForm feedId={searchedUser._id} />
          <PostFeed feedId={searchedUser._id} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})

const mapDispatchToProps = {}
const styles = StyleSheet.create({
  profileScreenContainer: {
    backgroundColor: '#fff'
  },
  container: {
    margin: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profile_pic: {
    height: 100,
    width: 100
  },
  profileNameText: {
    fontSize: 18
  }
})
export default connect(mapStateToProps, { getSearchedUser, addFriend })(
  SearchUserDetailScreen
)
