import React, { Component } from 'react'
import { Text, View, Button, StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerMenu, LoginModule } from './Routing'
import Authentication from './helpers/authentication'

export default class App extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
        <NavigationContainer>
            <StatusBar translucent={true}/>
            <Authentication/>
        </NavigationContainer>
      
    )
  }
}

