import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen'
import NewsFeedScreen from './screens/NewsFeedScreen'
import MaterialScreen from './screens/MaterialScreen'

function MasScreen() {
  return (
    <View>
      <Text>Mas!!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function InicioScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="NewsFeed" component={NewsFeedScreen} />
      <Tab.Screen name="Material" component={MaterialScreen} />
      <Tab.Screen name="Mas" component={MasScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={ LoginScreen }
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Inicio"
          component={ InicioScreen }
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;