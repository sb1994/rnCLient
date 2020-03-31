import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import SocialDetail from './SocialDetail'
import { getCurrentUser } from '../../../actions/userAuthActions'
class ProfileDetail extends Component {
  componentDidMount() {
    this.props.getCurrentUser()

    console.log(this.props.auth.user)
  }
  render() {
    let { auth, navigation } = this.props
    return (
      <View style={styles.container}>
        <Image
          style={styles.profile_pic}
          source={{ uri: auth.user.profile_pic }}
        />
        <Text style={styles.profileNameText}>{auth.user.name}</Text>

        <SocialDetail user={auth.user} />
        <Button
          title='Edit'
          onPress={() => navigation.push('ProfileEdit', { data: 'hello' })}
        />
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

export default connect(mapStateToProps, { getCurrentUser })(ProfileDetail)
