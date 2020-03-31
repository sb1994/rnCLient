import React from 'react'
import axios from 'axios'
// import Navigator from './Navigator'
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
// //user compoenents
import LoginScreen from './screens/Auth/LoginScreen'
import RegisterScreen from './screens/Auth/RegisterScreen'
import SplashScreen from './screens/SplashScreen'
// import Dashboard from './components/dashboard/Dashboard'
import ProfileScreen from './screens/Private/ProfileScreen'
import ProfileEditScreen from './screens/Private/ProfileEditScreen'
import SearchScreen from './screens/Search/SearchScreen'
import SearchUserDetailScreen from './screens/Search/SearchUserDetailScreen'
import ChatScreen from './screens/Chat/ChatScreen'
// import Chas from './screens/Search/Chas'
// import SearchUsers2 from './components/seach_users/SearchUsers2'
// import Home from './components/Home'
// import Details from "./components/test/Details"

const Stack = createStackNavigator()
const ProfileStack = createStackNavigator()
const SearchStack = createStackNavigator()
const AuthTabStack = createBottomTabNavigator()
const AppTabStack = createBottomTabNavigator()

//Profile Stack
const ProfileStackNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name='ProfileDetail' component={ProfileScreen} />
    <ProfileStack.Screen name='ProfileEdit' component={ProfileEditScreen} />
  </ProfileStack.Navigator>
)
const SearchStackNavigator = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name='SearchScreen' component={SearchScreen} />
    <SearchStack.Screen
      name='SearchUserDetail'
      component={SearchUserDetailScreen}
    />
  </SearchStack.Navigator>
)

//Authenticaed stack
const AuthTabStackNavigator = () => (
  <AuthTabStack.Navigator
    tabBarOptions={{
      activeTintColor: '#e91e63',
      padding: 10
    }}
  >
    <AuthTabStack.Screen name='Profile' component={ProfileStackNavigator} />
    <AuthTabStack.Screen name='Search' component={SearchStackNavigator} />
    <AuthTabStack.Screen name='Chat' component={ChatScreen} />
  </AuthTabStack.Navigator>
)
// const AuthTabStackNavigator = () => (
//   <AuthTabStack.Navigator
//
//   >
//     <AuthTabStack.Screen name='Profile' component={ProfileStackNavigator} />
//     <AuthTabStack.Screen name='Search' component={SearchScreen} />
//     {/* <AuthTabStack.Screen name='Login' component={LoginScreen} />
//     <AuthTabStack.Screen name='Register' component={RegisterScreen} /> */}
//   </AuthTabStack.Navigator>
// )

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Splash' component={SplashScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Profile' component={AuthTabStackNavigator} />
          {/* <Stack.Screen name='Auth' component={AuthTabStackNavigator} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
