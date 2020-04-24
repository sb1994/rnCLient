import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
class Comment extends Component {
  render() {
    let { comment } = this.props

    // let stillUTC = moment.utc(comment.created).toDate()
    // console.log(stillUTC)

    // let created = moment.locale('uk').format(stillUTC, 'DD-MM-YYYY HH:mm')
    // console.log(created)

    return (
      <View style={styles.commentContainer}>
        <View style={styles.profilePicContainer}>
          <Image
            style={styles.profile_pic}
            source={{ uri: comment.user.profile_pic }}
          />
        </View>
        <View style={styles.commentBody}>
          <View style={styles.commentDetailsView}>
            <View style={styles.commentUsername}>
              <Text style={{ color: 'white' }}>{comment.user.name}</Text>
            </View>
            <View style={styles.commentUsername}>
              {/* <Text style={{ color: 'white' }}>{created}</Text> */}
            </View>

            {/* </View> */}
          </View>
          <Text style={{ color: 'white' }}>{comment.text}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}
const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: '#2abbac',
    margin: 10,
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  profilePicContainer: {
    paddingRight: 10
  },
  profile_pic: {
    height: 50,
    width: 50,
    padding: 12
  },
  commentDetailsView: {
    flexDirection: 'row'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
