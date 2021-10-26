import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import SearchProfile from '../View/components/Screens/SearchProfile'
import Login from '../View/components/Screens/Login'
import Search from '../View/components/Screens/Search'
import Vaga from '../View/components/Screens/Vaga'
import Profile from '../View/components/Screens/Profile'
import Home from '../View/components/Screens/Home'
import Notification from '../View/components/Screens/Notification'
import { CustomDrawerContent } from '../View/components/Screens/DrawerContent';

const HomeStack = createStackNavigator()
const BottomStack = createBottomTabNavigator()
const Drawer = createDrawerNavigator();
const LoginStack = createStackNavigator();

export const LoginModule = ({navigation}) =>{
    return(
        <LoginStack.Navigator>
            <LoginStack.Screen name="LoginScreen" component={Login} options={{
                headerShown: false
            }}/>
        </LoginStack.Navigator>
    )
}

export const SearchModule = ({navigation}) => {
    return(
      <HomeStack.Navigator> 
          <HomeStack.Screen name="SearchPage" component={Search} options={{title:'Search', headerTitleAlign:'center', 
          headerLeft : () =>{
            return(
              <MaterialIcons name='menu' size={24} style={{marginLeft:'10%'}} onPress={() => navigation.toggleDrawer()}/>
            )
          }}}/>
          <HomeStack.Screen name="SearchProfile" component={SearchProfile} options={{title:'SearchProfile', headerTitleAlign:'center'}}/>
      </HomeStack.Navigator>
    )
  }
  
  export const BottomTab = ({navigation}) =>{
    return(
      <BottomStack.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                  if (route.name === 'BottomStackHome') {
                    iconName = 'home'
                  } else if (route.name === 'Vaga') {
                    iconName = 'gamepad'
                  } else if (route.name === 'Search') {
                    iconName = 'search'
                  }
                return <FontAwesome name={iconName} size={size} color={color}/>;
              },
              tabBarActiveTintColor: '#7bdbbe',
              tabBarInactiveTintColor: 'gray',
              
            })}
          >
            <BottomStack.Screen name="BottomStackHome" component={Home} options={{title:'Home', headerTitleAlign:'center', 
            headerLeft : () =>{
            return(
              <MaterialIcons name='menu' size={24} style={{marginLeft:'10%'}} onPress={() => navigation.toggleDrawer()}/>
            )}}}/>
            <BottomStack.Screen name="Vaga" component={Vaga} options={{title:'Vaga', headerTitleAlign:'center',
            headerLeft : () =>{
              return(
                <MaterialIcons name='menu' size={24} style={{marginLeft:'10%'}} onPress={() => navigation.toggleDrawer()}/>
              )
            }}}/>
            <BottomStack.Screen name="Search" component={SearchModule} options={{headerTitleAlign:'center', headerShown:false}}/>
          </BottomStack.Navigator>
    )
  }
  
  export const DrawerMenu = () =>{
    return(
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="HomePage" component={BottomTab} options={{headerShown:false}}/>
      </Drawer.Navigator>
    )
  }
