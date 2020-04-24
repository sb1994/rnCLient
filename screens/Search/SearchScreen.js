import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/searchActions'
import SearchListItem from './components/SearchListItem'

class SearchScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: {},
      term: ''
    }
  }

  componentWillMount() {
    this.props.getUsers()
  }
  render() {
    // console.log(this.props.search.users)
    let { term } = this.state
    let { users } = this.props.search
    let { auth, navigation } = this.props

    let fileredUsers = this.props.search.users.filter(user => {
      return user.name.toLowerCase().includes(term)
    })
    if (term === '') {
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={term => this.setState({ term })}
              placeholder='Enter Name of user'
              value={this.state.text}
            />
          </View>
          <FlatList
            data={users}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <SearchListItem user={item} navigation={navigation} />
            )}
            style={styles.listContainer}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={term => this.setState({ term })}
              placeholder='Enter Name of user'
              value={this.state.text}
              autoCapitalize='none'
            />
          </View>
          <FlatList
            data={fileredUsers}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <SearchListItem user={item} navigation={navigation} />
            )}
            style={styles.listContainer}
          />
        </View>
      )
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})

const mapDispatchToProps = {}
const styles = StyleSheet.create({
  // style
  container: {
    marginTop: 10,
    flex: 1
  },
  searchInput: {
    marginHorizontal: 1
  },
  inputContainer: {
    marginBottom: 10,
    marginTop: 5
  }
})

export default connect(mapStateToProps, { getUsers })(SearchScreen)
