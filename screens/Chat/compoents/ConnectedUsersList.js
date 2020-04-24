import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import ConnectedUserListItem from './ConnectedUserListItem'
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
      <View style={styles.container}>
        <FlatList
          data={connectedUsers}
          horizontal
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <ConnectedUserListItem user={item.value} />}
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
    height: 90,
    backgroundColor: '#2abbac'
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ConnectedUsersList)
