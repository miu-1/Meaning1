import React, { Component, useState, useCallback, useRef } from 'react';
import { Text, View, Alert, StyleSheet, ImageBackground } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import {WebView} from 'react-native-webview';
import Constant from 'expo-constants';
import PDF from './PDFAct/Act1.pdf';

export default function TipDetails({ route,navigation }) {
  const { Titulo } = route.params;
  const {DescripcionVideo} = route.params;
  const {Video} = route.params;
  const {DescripcionActividad} = route.params;
  
  if (Video){
    return(
      <View style={{flex: 1, padding: 6}}>
        <View style={styles.header}>
          <Text style={styles.tituloact}>{Titulo}</Text>
        </View>
        <View style={{flex: 2, marginHorizontal:6, marginTop: 10, borderRadius: 7, borderWidth: 1, padding: 6}}>
          <Text style={{fontSize: 16, textAlign: 'left', marginBottom: 15}}>{DescripcionVideo}</Text>
          <WebView
            style={{width: '100%', height: 270, borderWidth:1}}
            source={{ uri: Video }}
          />  
        </View>
        <View style={{flex: 2, marginHorizontal:6, marginTop: 10, borderRadius: 7, borderWidth: 1, padding: 6}}>
          <Text style={{fontSize: 16, textAlign: 'left', marginTop: 15}}>{`Actividad: ${DescripcionActividad}`}</Text>
        </View>
      </View>
    );
  }else{
    return(
      <View style={{flex: 1, padding: 6}}>
        <View style={styles.header}>
          <Text style={styles.tituloact}>{Titulo}</Text>
        </View>
        <View style={{flex: 1, marginHorizontal:6, marginTop: 10, borderRadius: 7, borderWidth: 1, padding: 6}}>
          <Text style={{fontSize: 16, textAlign: 'left', marginBottom: 15}}>{DescripcionVideo}</Text>
        </View>
        <View style={{flex: 2, marginHorizontal:6, marginTop: 10, borderRadius: 7, borderWidth: 1, padding: 6}}>
          <Text style={{fontSize: 16, textAlign: 'left', marginTop: 15}}>{`Actividad: ${DescripcionActividad}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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