import React, {Component } from 'react';
import { Image, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import logo from './loglogo/logoblanco.png';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function(result) {
            console.log('user signed in ');
            if(result.additionalUserInfo.isNewUser){
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
                })
                .then(function(snapshot) {
                  //console.log('Snapshot', snapshot);
                });
            }else{
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .update({
                  last_logged_in: Date.now()
                })
            }
          })
          .catch(function(error) {
          // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          // The email of the user's account used.
            var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async() => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '432650538639-lei67eg5k9jeifkrn6fgrjs0419q261l.apps.googleusercontent.com',
        behavior: 'web',
        iosClientId: '432650538639-rd7vq84gabj2ko6smietfp68qdldli21.apps.googleusercontent.com',
        androidStandaloneAppClientId: '432650538639-7msbifgn1onr79uol55b9lh7k7n0oeet.apps.googleusercontent.com',
        webClientId:'432650538639-lh45nbv1veeb4ear4vg68jn70n220rdb.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

    state = {
      email: '',
      password: '',
    };
  

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Image source={logo} style={styles.logog} />
          
          <TouchableOpacity
            style={styles.Btnlogin}
            onPress={() => this.signInWithGoogleAsync()}
          >
            <Text style={styles.BtnText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logog: {
    width: 225,
    //height: 135,
    resizeMode: 'contain',
    marginTop: 5,
    marginBottom: 5
  },
  inputView: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: 'center',
    height: 35,
    width: '93%',
    fontSize: 9,
    padding: 12,
    marginBottom: 10,
  },
  inputtext: {
    color: '#FFFFFF',
    height: 33,
  },
  forgot: {
    color: '#FFBD3A',
    fontSize: 12,
    textAlign: 'right',
    marginLeft: 190,
    marginBottom: 33,
  },
  Btnlogin: {
    width: 327,
    backgroundColor: '#FFBD3A',
    borderRadius: 30,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    height: 45,
  },
  BtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  abajo: {
    flex: 1,
    marginTop: 40,
    fontSize: 7,
    alignItems:'flex-start',
    flexDirection: 'row',
    //flexWrap:'wrap',
    justifyContent: 'flex-end',
  },
  cuentapregunta: {
    color: '#666666',
  },
  input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
   registrate: {
    color: '#FFBD3A',
  },
});


export default LoginScreen;