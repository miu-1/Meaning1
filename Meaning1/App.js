import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ICONHOME from './assets/Home.png';
import ICONSAVED from './assets/Guardado.png';
import ICONMAS from './assets/Mas.png';

import LoginScreen from './screens/LoginScreen'
import SavedScreen from './screens/SavedScreen'
import MaterialScreen from './screens/MaterialScreen'
import ActividadDetails from './screens/ActividadDetails'
import TipDetails from './screens/TipDetails'

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
      <Tab.Screen 
        name="Material" 
        component={MaterialScreen}
      />
      <Tab.Screen 
        name="Guardados" 
        component={SavedScreen} 
      />
      <Tab.Screen 
        name="Mas" 
        component={MasScreen}
      />
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
        <Stack.Screen
          name="Actividad"
          component= { ActividadDetails }
          options={{headerShown: true,
            headerTintColor: '#5A5A5A',
            headerTitleStyle: { fontWight: 'bold'},
          }}
        />
        <Stack.Screen
          name="Tip"
          component= {TipDetails}
          options={{
            headerShown: true,
            headerTintColor: '#5A5A5A',
            headerTitleStyle: { fontWight: 'bold'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;