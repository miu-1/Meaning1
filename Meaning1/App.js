import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ICONHOME from './assets/Home.png';
import ICONSAVED from './assets/Guardado.png';
import ICONMAS from './assets/Mas.png';
import { useFonts } from 'expo-font';
import { SourceSansPro_400Regular, SourceSansPro_600SemiBold, SourceSansPro_700Bold } from '@expo-google-fonts/source-sans-pro';
import { Ubuntu_500Medium, Ubuntu_400Regular} from '@expo-google-fonts/ubuntu';
import { AppLoading } from 'expo';

import LoginScreen from './screens/LoginScreen'
import SavedScreen from './screens/SavedScreen'
import MaterialScreen from './screens/MaterialScreen'
import ActividadDetails from './screens/ActividadDetails'
import TipDetails from './screens/TipDetails'
import LoadingScreen from './screens/LoadingScreen'
import MasScreen from './screens/MasScreen'
import ActividadFullscreen from './screens/ActividadFullscreen'

import * as firebase from 'firebase';
import {firebaseConfig} from './config';
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
var storage = firebase.storage();

const Tab = createBottomTabNavigator();

function InicioScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FFBD3A',
        inactiveTintColor: 'gray'
      }}>
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
        name="Mas" 
        component={MasScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Image 
              style={{width: 40, height: 35}}
              source= {ICONMAS}/>
          )
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App() { 
  
  let [fontsLoaded] = useFonts({
    SourceSansPro_400Regular, 
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
    Ubuntu_500Medium, 
    Ubuntu_400Regular
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
          options={{
            title: 'Actividad  +Meaning',
            headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, backgroundColor: '#DDDDDD'},
            headerTintColor: '#333333',
            headerTitleStyle: { fontFamily: 'Ubuntu_500Medium'},
          }}
        />
        <Stack.Screen
          name="Tip"
          component= {TipDetails}
          options={{
            title: 'Tip +Meaning',
            headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, backgroundColor: '#DDDDDD'},
            headerTintColor: '#333333',
            headerTitleStyle: { fontFamily: 'Ubuntu_500Medium'},
          }}
        />
        <Stack.Screen
          name="ActividadFullscreen"
          component={ ActividadFullscreen }
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;