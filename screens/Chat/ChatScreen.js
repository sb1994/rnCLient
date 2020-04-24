import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import ConnectedUsersList from './compoents/ConnectedUsersList'
import ChatFeed from './compoents/ChatFeed'
import ChatForm from './compoents/ChatForm'
import * as _ from 'lodash'
import { getChatMessages } from '../../actions/chatActions'
import ConnectedUserListItem from './compoents/ConnectedUserListItem'
import ChatListItem from './compoents/ChatListItem'
class ChatScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: {},
      activeChat: null,
      chatMessages: [],
      socket: null,
      text: ''
    }

    // this.socket = io('https://pacific-coast-97072.herokuapp.com')
  }
  componentDidMount() {
    let { auth } = this.props
    this.props.getChatMessages()
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

      this.setState({ users: connectedUsers, socket: this.socket })
    })
    this.socket.on('newUserConnected', connections => {
      // let { connections } = connections
      let connectedUsers = connections.connections

      connectedUsers = _.entries(connectedUsers).map(p => ({
        key: p[0],
        value: p[1]
      }))

      // console.log(connectedUsers.length)

      this.setState({ users: connectedUsers, socket: this.socket })
    })
    this.socket.on('added message', chat => {
      // console.log(chat)

      this.props.getChatMessages()
      // let { connections } = connections
      // let connectedUsers = connections.connections

      // connectedUsers = _.entries(connectedUsers).map(p => ({
      //   key: p[0],
      //   value: p[1]
      // }))

      // console.log(connectedUsers.length)

      // this.setState({ chatMessages: chat.chat })
    })
  }
  // componentWillUnmount() {
  //   this.socket.emit('disconnect', {
  //     query: { currentUser: this.props.auth.user._id }
  //   })
  // }
  handleSubmitChatMessage = () => {
    this.socket.emit('add message', {
      text: this.state.text,
      sender: this.props.auth.user._id
    })
    this.setState({ text: '' })
  }

  render() {
    let { users, socket, chatMessages } = this.state
    let { chat } = this.props
    // console.log(chatMessages.length)
    // console.log(chatMessages)

    // let mess
    return (
      <View style={styles.container}>
        <ConnectedUsersList connectedUsers={users} socket={socket} />

        <View style={styles.chatContainer}>
          <FlatList
            data={chat.chat}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <ChatListItem message={item} />}
          />
        </View>
        <TextInput
          placeholder='Enter Message'
          autoCorrect={false}
          value={this.state.text}
          onSubmitEditing={this.handleSubmitChatMessage}
          onChangeText={text => {
            this.setState({ text })
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

const mapDispatchToProps = {}
const styles = StyleSheet.create({
  container: {
    marginTop: 23,
    flex: 1,
    backgroundColor: '#fff'
  },
  chatContainer: {
    height: 470
  }
})

export default connect(mapStateToProps, { getChatMessages })(ChatScreen)
