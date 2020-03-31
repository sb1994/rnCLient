import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { connect } from 'react-redux'
import io from 'socket.io-client'

class ChatScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chatMessage: '',
      chatMessages: ''
    }
    // this.socket = io('https://pacific-coast-97072.herokuapp.com')
  }
  componentDidMount() {
    this.socket = io('http://192.168.0.214:5000')
    this.socket.on('chatmessage', msg => {
      this.setState({
        chatMessages: [...this.state.chatMessages, msg]
      })
    })
  }
  handleSubmitChatMessage = () => {
    let { chatMessage } = this.state
    this.socket.emit('chat message', chatMessage)
    console.log(this.state)
    this.setState({ chatMessage: '' })
  }

  render() {
    let { chatMessages } = this.state
    console.log(chatMessages)

    // const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
    //   <Text key={index}>{chatMessage}</Text>
    // ))
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderWidth: 2 }}
          autoCorrect={false}
          onSubmitEditing={this.handleSubmitChatMessage}
          value={this.state.chatMessage}
          onChangeText={chatMessage => {
            this.setState({ chatMessage })
          }}
        />

        <FlatList
          data={chatMessages}
          keyExtractor={item => item}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}
const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
