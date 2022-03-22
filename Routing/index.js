import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import {SearchProvider} from '../context/SearchContext'
import {HomeProvider} from '../context/HomeContext'
import { VagasProvider } from '../context/VagasContext';

import SearchProfile from '../View/components/Screens/SearchProfile'
import Login from '../View/components/Screens/Login'
import Search from '../View/components/Screens/Search'
import Vaga from '../View/components/Screens/Vaga'
import Profile from '../View/components/Screens/Profile'
import Notification from '../View/components/Screens/Notification'
import Settings from '../View/components/Screens/Settings';
import { CustomDrawerContent } from '../View/components/Screens/DrawerContent';
import Signup from '../View/components/Screens/Signup'

import HomeScreen from '../View/components/Screens/Home/HomeScreen'
import SearchScreen from '../View/components/Screens/Home/SearchScreen'
import DetailScreen from '../View/components/Screens/Home/DetailScreen'

const HomeStack = createStackNavigator()
const BottomStack = createBottomTabNavigator()
const Drawer = createDrawerNavigator();
const AuthenticationStack = createStackNavigator();
const SearchStack = createStackNavigator();


export const AuthenticationModule = ({navigation}) =>{
  return(
        <AuthenticationStack.Navigator>
            <AuthenticationStack.Screen name="LoginScreen" component={Login} options={{
                headerShown: false
            }}/>
            <AuthenticationStack.Screen name="Signup" component={Signup} options={{title:'Signup', headerTitleAlign:'center'}}/>
        </AuthenticationStack.Navigator>
  )
}

export const HomeModule = ({navigation}) =>{
  return(
    <HomeProvider>
      <SearchProvider>
        <HomeStack.Navigator>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{title:'Home', headerTitleAlign:'center', headerShown:false}}/>
          <HomeStack.Screen name="Search" component={SearchScreen} options={{title:'Search', headerTitleAlign:'center', headerShown:false}}/>
          <HomeStack.Screen name="Detail" component={DetailScreen} options={{title:'Details', headerTitleAlign:'center', headerShown:false}}/>
        </HomeStack.Navigator>
      </SearchProvider>
    </HomeProvider>
  )
}

export const SearchModule = ({navigation}) => {
  return(
    <SearchStack.Navigator>
        <SearchStack.Screen name="SearchPage" component={Search} 
        options={{
          title:'Search', 
          headerTitleAlign:'center', 
          headerStyle:{backgroundColor:'black'},
          headerTitleStyle:{color:'white'},
        headerLeft : () =>{
          return(
            <MaterialIcons name='menu' size={24} color={'white'} style={{marginLeft:'10%'}} onPress={() => navigation.toggleDrawer()}/>
          )
        }}}/>
        <SearchStack.Screen name="SearchProfile" component={SearchProfile} 
          options={{
            title:'SearchProfile', 
            headerTitleAlign:'center',
            headerStyle:{backgroundColor:'black'},
            headerTitleStyle:{color:'white'},
          }}
        />
    </SearchStack.Navigator>
  )
}
  
export const BottomTab = ({navigation}) =>{
  return(
    <VagasProvider>
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
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle:{
            backgroundColor:'#000'
          }
        })}
        
    >
    <BottomStack.Screen name="BottomStackHome" component={HomeModule} options={{title:'Home', headerTitleAlign:'center', headerShown:false,
      headerLeft : () =>{
      return(
        <MaterialIcons name='menu' size={24} color={'white'} style={{marginLeft:'10%'}} onPress={() => navigation.toggleDrawer()}/>
      )}}}/>
      
        <BottomStack.Screen name="Vaga" component={Vaga} 
        options={{
          title:'Vaga', 
          headerTitleAlign:'center',
          headerStyle:{backgroundColor:'black'},
          headerTitleStyle:{color:'white'},
        headerLeft : () =>{
          return(
            <MaterialIcons name='menu' size={24} color={'white'} style={{marginLeft:'10%'}} onPress={() => navigation.toggleDrawer()}/>
          )
        }}}/>
      
      <BottomStack.Screen name="Search" component={SearchModule} options={{headerTitleAlign:'center', headerShown:false}}/>
    </BottomStack.Navigator>
    </VagasProvider>
    )
  }
  
export const DrawerMenu = ({navigation}) =>{
  return(
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomePage" component={BottomTab} options={{headerShown:false}}/>
      <Drawer.Screen name="Profile" component={Profile} options={{headerTitleAlign:'center'}} options={{headerShown:false}} options={{
          title:'Profile', 
          headerTitleAlign:'center',
          headerStyle:{backgroundColor:'black'},
          headerTitleStyle:{color:'white'},
        // headerLeft : () =>{
        //   return(
        //     <MaterialIcons name='menu' size={24} color={'white'} style={{marginLeft:'10%'}} onPress={() => navigation.toggleDrawer()}/>
        //   )
        // }
      }}/>
      <Drawer.Screen name="Notification" component={Notification} options={{headerTitleAlign:'center'}}/>
      {/* <Drawer.Screen name="Settings" component={Settings} options={{headerTitleAlign:'center'}}/> */}
    </Drawer.Navigator>
  )
}
