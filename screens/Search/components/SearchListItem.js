import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class SearchListItem extends Component {
  render() {
    let { user, navigation } = this.props
    // console.log(navigation)

    return (
      <View style={styles.container}>
        <View style={styles.profileDetail}>
          <Image
            style={styles.profile_pic}
            source={{ uri: user.profile_pic }}
          />
          <View style={styles.textInput}>
            <Text> {user.name}</Text>
          </View>
        </View>
        <View style={styles.control}>
          <Button
            title='---'
            onPress={() =>
              navigation.navigate('Search', {
                screen: 'SearchUserDetail',
                params: { id: user._id, title: user.name }
              })
            }
          />
        </View>
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
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  profileDetail: { flexDirection: 'row', width: '85%', paddingTop: 10 },
  profile_pic: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
    borderRadius: 150 / 2
  },
  textInput: {
    paddingTop: 15
  }
})

export default connect(mapStateToProps, { mapDispatchToProps })(SearchListItem)
