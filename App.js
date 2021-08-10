import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './View/Login';

const Stack = createStackNavigator();

export default function App() {
return(
  <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  </NavigationContainer>
);

}