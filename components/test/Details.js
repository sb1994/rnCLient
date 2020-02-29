import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Details extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    let { route } = this.props
    return (
      <View>
        <Text> Details </Text>
        <Text>{route.params.name}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
