import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons';

import Perfil from './View/components/Screens/Perfil'
import Login from './View/components/Screens/Login'
import Home from './View/components/Screens/Home'
import Company from './View/components/Screens/Company'
import Search from './View/components/Screens/Search'

const HomeStack = createStackNavigator()
const BottomStack = createBottomTabNavigator()



export default class App extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
        // <Login/>
        <NavigationContainer>
          <BottomStack.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'home'
                } else if (route.name === 'Perfil') {
                  iconName = 'user'
                } else if (route.name === 'Company') {
                  iconName = 'gamepad'
                } else if (route.name === 'Search') {
                  iconName = 'search'
                }

                // You can return any component that you like here!
                return <FontAwesome name={iconName} size={size} color={color}/>;
              },
              tabBarActiveTintColor: '#7bdbbe',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <BottomStack.Screen name="Home" component={Home} options={{title:'Home'}}/>
            <BottomStack.Screen name="Perfil" component={Perfil} options={{title:'Perfil'}}/>
            <BottomStack.Screen name="Company" component={Company} options={{title:'Company'}}/>
            <BottomStack.Screen name="Search" component={Search} options={{title:'Search'}}/>
          </BottomStack.Navigator>
        </NavigationContainer>
    )
  }
}

