import React, {Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import headerlogo from './loglogo/logo2.png';
import Constant from 'expo-constants';
import firebase from 'firebase';

class MasScreen extends Component{
  render() {
    return(
      <View style = { styles.container } >
        <View style={styles.header}>
          <Image source={headerlogo} style={styles.logo} />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingVertical: 150}}>
          <Button title= "Cerrar Sesión" onPress={() => firebase.auth().signOut()} color='#FFBD3A' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: Constant.statusBarHeight,
    height: 60,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column'
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginLeft: 23,
    resizeMode: 'contain'
  }
});


export default MasScreen;
