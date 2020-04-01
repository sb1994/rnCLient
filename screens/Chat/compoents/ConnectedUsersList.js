import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import _ from 'lodash'
import { concat, filter, orderBy } from 'lodash'
class ConnectedUsersList extends Component {
  componentDidMount() {
    // console.log(this.props.connectedUsers)
  }
  render() {
    let { connectedUsers, auth } = this.props
    // let renderUsers
    // console.log(connectedUsers)

    // if (connectedUsers !== null) {
    //   renderUsers = connectedUsers.map(user => {
    //     return user !== auth.user._id
    //   })
    // }

    // console.log(renderUsers)

    return (
      <View>
        <Text> Connected list </Text>
        {/* <FlatList
          data={renderUsers}
          renderItem={({ item }) => <Text>{item._id}</Text>}
        /> */}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedUsersList)
