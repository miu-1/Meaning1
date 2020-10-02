import React, { Component, useState, useCallback, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import {WebView} from 'react-native-webview';
import firebase from 'firebase';

export default function ActividadFullscreen({ route,navigation }) {
    const {PDF} = route.params;

    return(
        <View style={{flex:1}}>
            <WebView
              style={{width: '100%', borderWidth:1, marginBottom: 15}} 
              source={{ uri: 'https://www.google.com/' }}
              originWhitelist={['*']}
              startInLoadingState={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
        </View>
    );
}