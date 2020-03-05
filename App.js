import React, { Component } from 'react'
import axios from 'axios'
import { AsyncStorage } from 'react-native'
import setUserToken from './utils/setUserToken'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Login from './components/auth/Login'

// redux dependencyies
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//inport the store
import store from './store'

import jwt_decode from 'jwt-decode'

import { setLoggedUser, logoutUser } from './actions/userAuthActions'
//user compoenents
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/dashboard/Profile'
import SearchUsers from './components/seach_users/SearchUsers'
import SearchUsers2 from './components/seach_users/SearchUsers2'
import Home from './components/Home'
import Details from "./components/test/Details"


const AuthStack = createStackNavigator()
const TabStack = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SearchStack = createStackNavigator()
const ProfileStack = createStackNavigator()

//create a Drawer
const Drawer = createDrawerNavigator()


const TabsScreen = () => (
  <TabStack.Navigator>
    <TabStack.Screen name='Home' component={HomeStackScreen} />
    <TabStack.Screen name='Search' component={SearchStackScreen} />
  </TabStack.Navigator>)
// const Drawer = createD

// const ProfileStackScreen = () => (
//   <ProfileStack.Navigator>
//     <ProfileStack.Screen name='Profile' component={Profile} />
//   </ProfileStack.Navigator>)
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name='Search' component={SearchUsers} />
    <SearchStack.Screen name='Search2' component={SearchUsers2} />
  </SearchStack.Navigator>
)
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='Home' component={Home} />
    <HomeStack.Screen name='Details' component={Details} options={({ route }) => ({
      title: route.params.name
    })} />
  </HomeStack.Navigator>
)

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenAuth: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token', (err, result) => {
      // console.log(result)
      if (result === null) {
        console.log('token doent exist')
        this.setState({
          tokenAuth: false
        })

      } else {
        console.log(result)
        const decoded = jwt_decode(result)
        store.dispatch(setLoggedUser(decoded))
        // console.log(decoded)
        this.setState({
          tokenAuth: true
        })
      }
    })
  }
  render() {
    console.log(store)

    return (
      <Provider store={store}>
        <NavigationContainer>

          <AuthStack.Navigator>
            <AuthStack.Screen
              name='Login'
              component={Login}
              options={{ title: 'Sign In' }}
            />
            <AuthStack.Screen
              name='Dashboard'
              component={Dashboard}
              options={{ title: 'Dashboard' }}
            />
            <AuthStack.Screen
              name='Register'
              component={Register}
              options={{ title: 'Sign Up' }}
            />
          </AuthStack.Navigator>


        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
