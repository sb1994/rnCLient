import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ChatForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      socket: {}
    }
    // this.socket = this.props.socket
  }

  componentDidMount() {
    this.setState({ socket: this.props.socket })
  }
  handleSubmitChatMessage = () => {
    this.props.socket.emit('addMessage', {
      text: this.state.text,
      sender: this.props.auth.user._id
    })
    this.setState({ text: '' })
  }
  render() {
    // console.log(this.state)

    return (
      <View>
        <TextInput
          placeholder='Enter Message'
          autoCorrect={false}
          value={this.state.text}
          onSubmitEditing={() => this.handleSubmitChatMessage}
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
  container: {}
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm)
