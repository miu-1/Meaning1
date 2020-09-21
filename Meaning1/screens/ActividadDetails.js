import React, { Component, useState, useCallback, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import {WebView} from 'react-native-webview';
import Constant from 'expo-constants';
import firebase from 'firebase';

export default function ActividadDetails({ route,navigation }) {
  const { Titulo } = route.params;
  const {DescripcionVideo} = route.params;
  const {Video} = route.params;
  const {DescripcionActividad} = route.params;
  const {ActividadPDF} = route.params;

  var storage = firebase.storage();
  var storageRef = storage.ref();
  var ActividadesRef = storageRef.child('Actividades');
  var PdfRef=ActividadesRef.child(ActividadPDF);
  var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/app-mobile-meaning.appspot.com/o/Afiche%20feria%20universtiaria.pdf?alt=media&token=4d447714-387c-419a-9b18-8d93541b26a7')
  
  if (Video){
      return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.tituloact}>{Titulo}</Text>
          </View>
          <ScrollView style={{flex: 1, marginHorizontal:6, marginTop: 10, borderRadius: 7, borderWidth: 1, padding: 6}}>
            <Text style={{fontSize: 16, textAlign: 'left', marginBottom: 15}}>{DescripcionVideo}</Text>
            <WebView 
              style={{width: '100%', height: 200, borderWidth:1, marginBottom: 15}} 
              source={{ uri: Video }}
              originWhitelist={['*']}
              startInLoadingState={true}
            />
            <Text style={{fontSize: 16, textAlign: 'left', marginTop: 10}}>{`Actividad: ${DescripcionActividad}`}</Text>
            <WebView 
              style={{height: 500}} 
              source= {{uri: ActividadPDF}}
              originWhitelist={['*']}
              startInLoadingState={true}
            />
          </ScrollView>
        </View>
      );
  }else{
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.tituloact}>{Titulo}</Text>
        </View>
        <ScrollView>
          <View style={{flex: 1, marginHorizontal:6, marginTop: 10, borderRadius: 7, borderWidth: 1, padding: 6}}>
            <Text style={{fontSize: 16, textAlign: 'left', marginBottom: 6}}>{DescripcionVideo}</Text>
          </View>
          <View style={{flex: 2, marginHorizontal:6, marginTop: 10, borderRadius: 7, borderWidth: 1, padding: 6}}>
            <Text style={{fontSize: 16, textAlign: 'left', marginTop: 15}}>{`Actividad: ${DescripcionActividad}`}</Text>
            <WebView 
              style={{height: 500}} 
              source= {{uri: "https://reactnativemaster.com/wp-content/uploads/2020/02/React-native-document-viewer-pdf-sample.pdf"  }}
              originWhitelist={['*']}
              startInLoadingState={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: Constant.statusBarHeight,
    backgroundColor: '#272727',
    borderRadius:10,
    marginHorizontal:10
  },
  tituloact: {
      textAlign: 'center',
      fontSize: 26,
      fontWeight:'bold',
      textAlignVertical: 'center',
      padding: 10,
      color: '#FFFFFF',
      opacity: 0.75
  }
});