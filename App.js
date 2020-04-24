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
    <ProfileStack.Screen
      name='ProfileDetail'
      component={ProfileScreen}
      options={{
        title: 'Profile Detail',
        headerTintColor: '#ffffff',
        /*headerBackground: (
          <Image
              style={StyleSheet.absoluteFill}
              source={require('./imgs/yr_logo.png')}
          />
      ),*/
        headerStyle: {
          backgroundColor: '#2abbac',
          borderBottomColor: 'black',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          fontSize: 18
        }
      }}
    />
    <ProfileStack.Screen
      name='ProfileEdit'
      component={ProfileEditScreen}
      options={{
        title: 'Edit Profile',
        headerTintColor: '#ffffff',
        /*headerBackground: (
          <Image
              style={StyleSheet.absoluteFill}
              source={require('./imgs/yr_logo.png')}
          />
      ),*/
        headerStyle: {
          backgroundColor: '#2abbac',
          borderBottomColor: 'black',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          fontSize: 18
        }
      }}
    />
  </ProfileStack.Navigator>
)
const SearchStackNavigator = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name='SearchScreen'
      component={SearchScreen}
      options={{
        title: 'User Search',
        headerTintColor: '#ffffff',
        /*headerBackground: (
          <Image
              style={StyleSheet.absoluteFill}
              source={require('./imgs/yr_logo.png')}
          />
      ),*/
        headerStyle: {
          backgroundColor: '#2abbac',
          borderBottomColor: 'black',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          fontSize: 18
        }
      }}
    />
    <SearchStack.Screen
      name='SearchUserDetail'
      options={{
        title: 'User Details',
        headerTintColor: '#ffffff',
        /*headerBackground: (
          <Image
              style={StyleSheet.absoluteFill}
              source={require('./imgs/yr_logo.png')}
          />
      ),*/
        headerStyle: {
          backgroundColor: '#2abbac',
          borderBottomColor: 'black',
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          fontSize: 18
        }
      }}
      component={SearchUserDetailScreen}
    />
  </SearchStack.Navigator>
)

//Authenticaed stack
const AuthTabStackNavigator = () => (
  <AuthTabStack.Navigator
    tabBarOptions={{
      inactiveBackgroundColor: '#2abbac',
      activeBackgroundColor: '#2abbac',
      backgroundColor: '#2abbac',
      activeTintColor: '#fffdd0',
      inactiveTintColor: '#fff',
      padding: 10,
      fontSize: 50,
      textAlign: 'center'
    }}
  >
    <AuthTabStack.Screen name='Profile' component={ProfileStackNavigator} />
    <AuthTabStack.Screen name='Search' component={SearchStackNavigator} />
    <AuthTabStack.Screen name='Chat' component={ChatScreen} />
  </AuthTabStack.Navigator>
)
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Splash' component={SplashScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Profile' component={AuthTabStackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {}
})
