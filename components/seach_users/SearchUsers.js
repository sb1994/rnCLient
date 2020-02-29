import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class SearchUsers extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    let { navigation } = this.props
    return (
      <View>
        <Text> Search Users</Text>
        <Button title="Search USers 2" onPress={() => navigation.push('Search2', { name: 'React Native by Example' })} />
        <Button title="React Native School" onPress={() => navigation.navigate('Home', {
          screen: 'Details',
          params: { name: 'React Native School' }
        })} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers)
