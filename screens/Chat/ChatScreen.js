import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import ConnectedUsersList from './compoents/ConnectedUsersList'
import * as _ from 'lodash'
class ChatScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: {},
      activeChat: null,
      chats: [],
      socket: null
    }
    this.socket = io('http://192.168.0.214:5000', {
      query: { currentUser: this.props.auth.user._id }
    })
    this.socket.on('disconnected', connections => {
      // let { connections } = connections
      let connectedUsers = connections.connections

      connectedUsers = _.entries(connectedUsers).map(p => ({
        key: p[0],
        value: p[1]
      }))

      console.log(connectedUsers)

      // this.setState({ users: connectedUsers, socket: this.socket })
    })
    // this.socket = io('https://pacific-coast-97072.herokuapp.com')
  }
  componentDidMount() {
    let { auth } = this.props
    // console.log(auth)

    // let { auth } = this.props
    // this.socket = io('http://192.168.0.214:5000', {
    //   query: { currentUser: auth.user._id }
    // })

    this.socket.on('newUserConnected', connections => {
      // let { connections } = connections
      let connectedUsers = connections.connections

      connectedUsers = _.entries(connectedUsers).map(p => ({
        key: p[0],
        value: p[1]
      }))

      console.log(connectedUsers.length)

      this.setState({ users: connectedUsers, socket: this.socket })
    })
    // this.socket.on('disconnected', connections => {
    //   // let { connections } = connections
    //   let connectedUsers = connections.connections

    //   connectedUsers = _.entries(connectedUsers).map(p => ({
    //     key: p[0],
    //     value: p[1]
    //   }))

    //   console.log(connectedUsers.length)

    //   // this.setState({ users: connectedUsers, socket: this.socket })
    // })
  }
  // handleSubmitChatMessage = () => {
  //   let { chatMessage } = this.state
  //   this.socket.emit('chat message', chatMessage)
  //   console.log(this.state)
  //   this.setState({ chatMessage: '' })
  // }

  render() {
    let { users, socket } = this.state
    // console.log(this.state)
    // console.log(this.socket)
    // console.log(users)

    // const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
    //   <Text key={index}>{chatMessage}</Text>
    // ))
    return (
      <View style={styles.container}>
        <ConnectedUsersList connectedUsers={users} socket={socket} />

        <FlatList
          data={users}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <Text>{item.value.name}</Text>}
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
    marginTop: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
