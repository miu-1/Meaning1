import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
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
import LoadingScreen from './screens/LoadingScreen'
import MasScreen from './screens/MasScreen'

import * as firebase from 'firebase';
import {firebaseConfig} from './config';
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

const Tab = createBottomTabNavigator();

function InicioScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Material" 
        component={MaterialScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image 
              style={{width: 36, height: 36, marginTop: 2}}
              source= {ICONHOME}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Guardados" 
        component={SavedScreen} 
        options={{
          tabBarIcon: ({color}) => (
            <Image 
              style={{width: 35, height: 35}}
              source= {ICONSAVED}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Mas" 
        component={MasScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image 
              style={{width: 40, height: 35}}
              source= {ICONMAS}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name= "Loading"
          component={ LoadingScreen}
          options={{ headerShown: false}}
        />
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
            headerTitleStyle: { fontWeight: 'bold'},
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