import React, {Component } from 'react';
import { Image, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import logo from './loglogo/logonegro.png';

class LoginScreen extends Component {

    state = {
      email: '',
      password: '',
    };
  
  
  onLogin() {
    const { email, password } = this.state;
    if(email=="" || password ==""){
      Alert.alert('Falta algo')
    }else{
      this.props.navigation.navigate('Inicio')
      //Alert.alert("Todo ok.")
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={logo} style={styles.logog} />
        <View style={styles.inputView}>
          <TextInput
            value={this.state.email}
            returnKeyType="next"
            //keyboardType = 'email-address'
            onChangeText={(email) => this.setState({ email })}
            placeholder='Telefono, usuario o correo electronico'
            placeholderTextColor = '#B4B4B4'
            onSubmitEditing={() => this.passwordInput.focus()}
            style={styles.inputtext} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Contrasena'}
            secureTextEntry={true}
            placeholderTextColor = '#B4B4B4'
            returnKeyType="go"
            ref={(input) => this.passwordInput = input}
            style={styles.inputtext} />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Btnlogin}
          onPress={this.onLogin.bind(this)}
        >
           <Text style={styles.BtnText}> Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.abajo}>
          <Text style={styles.cuentapregunta}>¿No tienes una cuenta?</Text>
          <TouchableOpacity>
            <Text style={styles.registrate}> Registrate</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272727',
  },
  logog: {
    width: 235,
    //height: 135,
    resizeMode: 'contain',
    marginTop: 80,
    marginBottom: 110
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
    marginTop: 47,
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
    fontFamily: 'Baskerville',
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