import React, {Component } from 'react';
import { Image, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, KeyboardAvoidingView, FlatList, ScrollView } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Chevron } from 'react-native-shapes';
import Constant from 'expo-constants';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import {Card} from 'react-native-paper';
import { ACTIVIDADES } from './Actividades';
import { TIPS } from './Tips';
import {useFonts} from 'expo-font'

const cursos = [
  { label: 'Prekinder/Kinder', value: 'Prekinder/Kinder' },
  { label: '1° Básico', value: '1° Básico' },
  { label: '2° Básico', value: '2° Básico' },
  { label: '3° Básico', value: '3° Básico' },
  { label: '4° Básico', value: '4° Básico' },
  { label: '5° Básico', value: '5° Básico' },
];

const materias = [
  { label: 'Matemáticas', value: 'Matemáticas' },
  { label: 'Lenguaje', value: 'Lenguaje' },
  { label: 'Ciencias Naturales', value: 'Ciencias Naturales' },
  { label: 'Historia', value: 'Historia' },
  { label: 'Inglés', value: 'Inglés'}
]



class MaterialScreen extends Component {
  constructor(props) {
    super(props);
   //el state de aqui abajo seria this.state y el extends Component seria extends React.Component
    this.state = {
      favCurso: undefined,
      favMateria: undefined,
      Actividades: ACTIVIDADES,
      Tips: TIPS,
      ActFiltered: ACTIVIDADES,
      TipsFiltered: TIPS,
    };
  }

  getActividad=(item)=>{
    this.props.navigation.navigate('Actividad', item);
  }

  getTip=(item)=>{
    this.props.navigation.navigate('Tip', item);
  }

  handleSearch(textsearch){
    this.setState({
      ActFiltered: this.state.Actividades.filter(i => i.Titulo.toLowerCase().indexOf(textsearch.toLowerCase()) !== -1)});
    this.setState({ 
      TipsFiltered: this.state.Tips.filter(i => i.Titulo.toLowerCase().indexOf(textsearch.toLowerCase()) !== -1)});
  }

  FilterSelect() {
    const { favCurso, favMateria } = this.state;
    if (favCurso == undefined){
      this.setState({ ActFiltered: this.state.Actividades.filter(i => i.Materia.includes(favMateria))})
    }else{
      //this.setState({ ActFiltered: this.state.Actividades.filter(i => i.Curso.includes(favCurso))})
      if(favMateria =='Matemáticas' || favMateria == 'Lenguaje' || favMateria == 'Ciencias Naturales' || favMateria == 'Historia'){
        this.setState({ ActFiltered: this.state.Actividades.filter(i => i.Materia.includes(favMateria) && i.Curso.includes(favCurso))})
      }else{
        this.setState({ ActFiltered: this.state.Actividades.filter(i => i.Curso.includes(favCurso))})
        if(favCurso == 'Prekinder/Kinder'){
          this.setState({ TipsFiltered: this.state.Tips.filter(i => i.Curso.includes('Prekinder/Kinder'))})
        }else{
          this.setState({ TipsFiltered: this.state.Tips.filter(i => i.Curso.includes('Básica'))})
        }
      }
    }
  }
    
  render() {
    return(
      <KeyboardAvoidingView behavior = "height" style = { styles.container } >
        
        <View style={styles.inputsearch}>
          <MaterialIcons style={{ marginLeft: 4, marginRight: 13 }} name="search" size={26} color='black' />
          <TextInput
            placeholder='Buscar'
            style={styles.buscar}
            returnKeyType="search"
            onChangeText= {text=> this.handleSearch(text)} />
        </View>

        <View style={styles.ContainerActTips}>
          <Text style={{padding: 5, fontFamily: 'SourceSansPro_600SemiBold', fontSize: 21, textAlign: 'left', borderBottomColor: '#ADADAD'}}>Actividades</Text>
          <View style={{flex:1, borderWidth: 1, borderColor: '#DDDDDD'}}>
            <FlatList
              data={this.state.ActFiltered}
              renderItem={({item})=>
                <Card style={{backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', borderRadius: 0}} onPress={this.getActividad.bind(this,item)}>
                  <View style= {{flex: 1, flexDirection:'row', padding: 5, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 13, fontFamily: 'Ubuntu_500Medium', marginRight: 6}}>{item.Titulo}</Text>
                  </View>

                  <View style= {{flex: 1, flexDirection:'row', padding: 6, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 13, fontFamily: 'Ubuntu_400Regular'}}>{item.Fecha}</Text>
                    <Text style={{flex: 2, fontSize: 13, textAlign: 'left', paddingRight: 6, marginLeft: 23, fontFamily: 'Ubuntu_400Regular'}}>{`${item.Curso} ${item.Materia}`}</Text> 
                  </View>
                </Card>
              }
              keyExtractor={item=>item.ID}
            />
          </View>
        </View>

        <View style={styles.ContainerActTips}> 
          <Text style={{fontFamily: 'SourceSansPro_600SemiBold', fontSize: 21, padding: 5, textAlign: 'left', borderBottomColor: '#ADADAD'}}>Tips</Text>
           <View style={{flex: 1, borderWidth: 1, borderColor:'#DDDDDD'}}>
            <FlatList
              data={this.state.TipsFiltered}
              renderItem={({item})=>
                <Card style={{backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', borderRadius: 0}} onPress={this.getTip.bind(this,item)}>
                  <View style= {{flex: 1, flexDirection:'row', padding: 5, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 13, fontFamily: 'Ubuntu_500Medium', marginRight:6}}>{item.Titulo}</Text>
                  </View>

                  <View style= {{flex: 1, flexDirection:'row', padding: 6, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 13, fontFamily: 'Ubuntu_400Regular'}}>{item.Fecha}</Text>
                    <Text style={{flex: 2, fontSize: 13, textAlign: 'left', paddingRight: 6, marginLeft: 60, fontFamily: 'Ubuntu_400Regular'}}>{`Nivel: ${item.Curso}`}</Text> 
                  </View>
                </Card>
              }
              keyExtractor={item=>item.ID}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    resizeMode: 'contain'
  },
  inputsearch: {
    marginTop: Constant.statusBarHeight,
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#6EB2E1',
    borderColor: '#6EB2E1',
    borderWidth: 1,
    borderRadius: 3,
    width: '94%',
    height: 41,
    padding: 8,
    fontSize: 19
  },
  buscar: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 280,
    height: 25
  },
  filtros:{
    marginTop: 6,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    width: '94%',
    height: 41,
    padding: 8,
    backgroundColor: '#6EB2E1',
    borderColor: '#6EB2E1',
    flexDirection: 'row'
  },
  iconofiltros: {
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: 'black',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  },
  Btnaplicar: {
    marginTop: 5,
    marginLeft: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    width: 51,
    backgroundColor: '#1C355E',
    borderRadius: 16,
    height: 20,
  },
  BtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'SourceSansPro_400Regular'
  },
  ContainerActTips: {
    flex: 1,
    marginTop: 6,
    marginLeft: 12,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 4,
    width: '93%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.80,
    elevation: 5,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginLeft: 7,
    fontSize: 5,
    //paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#ffffff',
    height: 24,
    width: 100
     // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 5,
    marginLeft: 7,
    paddingHorizontal: 4,
    //paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#ffffff',
    height: 24,
    width: 100
  },
});

export default MaterialScreen;
