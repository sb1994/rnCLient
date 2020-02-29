import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Home extends Component {
  static propTypes = {
    prop: PropTypes
  }


  render() {
    let { navigation } = this.props
    return (
      <View>
        <Text> Home </Text>
        <Text>Master List Screen</Text>
        <Button title="React Native by Example" onPress={() => navigation.push('Details', { name: 'React Native by Example' })} />
        <Button title="React Native School" onPress={() => navigation.push('Details', { name: 'React Native School' })} />
        <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
