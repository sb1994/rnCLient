import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Dashboard extends Component {
  static propTypes = {
    prop: PropTypes
  }

  componentDidMount() {
    console.log(this.props.auth.user)
  }
  render() {
    let { user } = this.props.auth
    return (
      <View style={{ flex: 1, width: 100 + '%', height: 100 + '%' }}>
        <View style={styles.tempNav}>
          <Text>Chat App</Text>
        </View>
        <Text> {user.name}</Text>
        <Image
          style={{ width: 100, height: 150 }}
          source={{ uri: user.profile_pic }}
        />
        <View />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

const styles = StyleSheet.create({
  tempNav: {
    width: 100 + '%',
    height: 75,
    backgroundColor: 'rgb(250,250,250)',
    borderBottomColor: 'rgb(233,33,233)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    //text
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
