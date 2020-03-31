import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

export class SocialDetail extends Component {
  render() {
    let { user } = this.props

    // console.log(user)

    // let { friend }
    return (
      <View>
        {user.email !== '' ? (
          <Text>
            <FontAwesome name='user' size={32} />: {user.email}
          </Text>
        ) : null}
        {user.location !== '' ? (
          <Text>
            <FontAwesome name='location-arrow' size={32} />: {user.location}
          </Text>
        ) : null}

        {user.location !== '' ? (
          <Text>
            <FontAwesome name='github' size={32} />: {user.githubusername}
          </Text>
        ) : null}
        {user.website !== '' ? (
          <Text>
            <FontAwesome name='external-link' size={32} />: {user.website}
          </Text>
        ) : null}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SocialDetail)
