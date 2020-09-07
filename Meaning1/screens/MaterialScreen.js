import React, {Component } from 'react';
import { Image, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, KeyboardAvoidingView, FlatList, ScrollView } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Chevron } from 'react-native-shapes';
import Constant from 'expo-constants';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import {Card} from 'react-native-paper';

const cursos = [
  { label: 'Jardín', value: 'Jardín' },
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
      Actividades: [
        {ID: '1', Titulo: 'Titulo Actividad 1', Fecha: '1 de Octubre 2020', Curso:'1° Básico', Materia:'Matemáticas'}, 
        {ID: '2', Titulo: 'Titulo Actividad 2', Fecha: '2 de Octubre 2020', Curso:'2° Básico', Materia:'Matemáticas'},
        {ID: '3', Titulo: 'Titulo Actividad 3', Fecha: '3 de Octubre 2020', Curso:'3° Básico', Materia:'Lenguaje'},
        {ID: '4', Titulo: 'Titulo Actividad 4', Fecha: '4 de Octubre 2020', Curso:'4° Básico', Materia:'Ciencias Naturales'},
        {ID: '5', Titulo: 'Titulo Actividad 5', Fecha: '5 de Octubre 2020', Curso:'1° Básico', Materia:'Historia'},
      ],
      Tips: [
        {ID: '1', Titulo: 'Titulo Tip 1', Fecha: '1 de Octubre 2020', Curso:'Básica'}, 
        {ID: '2', Titulo: 'Titulo Tip 2', Fecha: '2 de Octubre 2020', Curso:'Básica'},
        {ID: '3', Titulo: 'Titulo Tip 3', Fecha: '3 de Octubre 2020', Curso:'Jardín'},
        {ID: '4', Titulo: 'Titulo Tip 4', Fecha: '4 de Octubre 2020', Curso:'Padres Primerizos'},
        {ID: '5', Titulo: 'Titulo Tip 5', Fecha: '5 de Octubre 2020', Curso:'Padres Primerizos'},
      ],
      ActFiltered: [
        {ID: '1', Titulo: 'Titulo Actividad 1', Fecha: '1 de Octubre 2020', Curso:'1° Básico', Materia:'Matemáticas'}, 
        {ID: '2', Titulo: 'Titulo Actividad 2', Fecha: '2 de Octubre 2020', Curso:'2° Básico', Materia:'Matemáticas'},
        {ID: '3', Titulo: 'Titulo Actividad 3', Fecha: '3 de Octubre 2020', Curso:'3° Básico', Materia:'Lenguaje'},
        {ID: '4', Titulo: 'Titulo Actividad 4', Fecha: '4 de Octubre 2020', Curso:'4° Básico', Materia:'Ciencias Naturales'},
        {ID: '5', Titulo: 'Titulo Actividad 5', Fecha: '5 de Octubre 2020', Curso:'1° Básico', Materia:'Historia'},
      ],
      TipsFiltered: [
        {ID: '1', Titulo: 'Titulo Tip 1', Fecha: '1 de Octubre 2020', Curso:'Básica'}, 
        {ID: '2', Titulo: 'Titulo Tip 2', Fecha: '2 de Octubre 2020', Curso:'Básica'},
        {ID: '3', Titulo: 'Titulo Tip 3', Fecha: '3 de Octubre 2020', Curso:'Jardín'},
        {ID: '4', Titulo: 'Titulo Tip 4', Fecha: '4 de Octubre 2020', Curso:'Padres Primerizos'},
        {ID: '5', Titulo: 'Titulo Tip 5', Fecha: '5 de Octubre 2020', Curso:'Padres Primerizos'},
      ],
    };
  }

  getActividad=(item)=>{
    var Titulo=item.Titulo;
    var Fecha=item.Fecha;
    var Materia=item.Materia;
    var Curso=item.Curso;
    alert(Titulo+"\n"+Fecha+"\n"+Materia+"\n"+Curso);
  }

  getTip=(item)=>{
    var Titulo=item.Titulo;
    var Fecha=item.Fecha;
    var Curso=item.Curso;
    alert(Titulo+"\n"+Fecha+"\n"+Curso);
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
        if(favCurso == 'Jardín'){
          this.setState({ TipsFiltered: this.state.Tips.filter(i => i.Curso.includes('Jardín'))})
        }else{
          this.setState({ TipsFiltered: this.state.Tips.filter(i => i.Curso.includes('Básica'))})
        }
      }
    }
  }
    
  render() {
    return(
      <KeyboardAvoidingView behavior = "padding" style = { styles.container } >
        
        <View style={styles.inputsearch}>
          <MaterialIcons style={{ marginLeft: 4, marginRight: 13 }} name="search" size={26} color='black' />
          <TextInput
            placeholder='Buscar'
            style={styles.buscar}
            returnKeyType="search"
            onChangeText= {text=> this.handleSearch(text)} />
        </View>
        
        <View style={styles.filtros}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 7}}>Filtros: </Text>
          <RNPickerSelect
            placeholder={{
              label: 'Elige un curso...',
              value: null,
              color: '#000000',
            }}
            items={cursos}
            onValueChange={value => {this.setState({favCurso: value})}}
            style= {{
              ...pickerSelectStyles,
              iconContainer: {
                top: 11,
                right: 10,
              },
            }}
            value={this.state.favCurso}
            Icon={() => {
              return (
                <View style={styles.iconofiltros}/>
              );
            }}
          />
          <RNPickerSelect
            placeholder={{
              label: 'Elige una materia...',
              value: null,
              color: '#000000'
            }}
            items={materias}
            onValueChange={value => {this.setState({favMateria: value})}}
            style= {{
              ...pickerSelectStyles,
              iconContainer: {
                top: 11,
                right: 10,
              },
            }}
            value={this.state.favMateria}
            Icon={() => {
              return (
                <View style={styles.iconofiltros}/>
              );
            }}
          />
          <TouchableOpacity style={styles.Btnaplicar} onPress={this.FilterSelect.bind(this)}>
            <Text style={styles.BtnText}> Aplicar </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ContainerActTips}>
          <Text style={{marginBottom:8, fontWeight: 'bold', fontSize: 23, textAlign: 'center'}}>Actividades</Text>
          <View style={{flex:1, width: '99%', borderWidth: 1, borderColor:'#DDDDDD' , borderRadius: 5}}>
            <FlatList
              data={this.state.ActFiltered}
              renderItem={({item})=>
                <Card style={{backgroundColor: '#EFEFEF', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', borderRadius: 0}} onPress={this.getActividad.bind(this,item)}>
                  <View style= {{flex: 1, flexDirection:'row', padding: 5, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 15}}>{item.Titulo}</Text>
                    <Text style={{flex: 1, fontSize: 15, marginLeft: 40}}>{item.Fecha}</Text>
                  </View>

                  <View style= {{flex: 1, flexDirection:'row', padding: 5, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 15}}>{item.Curso}</Text> 
                    <Text style={{flex: 1, fontSize: 15, marginLeft: 40}}>{item.Materia}</Text>
                  </View>
                </Card>
              }
              keyExtractor={item=>item.ID}
            />
          </View>
         
          <Text style={{marginBottom:8, fontWeight: 'bold', fontSize: 23, marginTop: 5, textAlign: 'center'}}>Tips</Text>
           <View style={{flex:1, width: '99%', borderWidth: 1, borderColor:'#DDDDDD' , borderRadius: 5}}>
            <FlatList
              data={this.state.TipsFiltered}
              renderItem={({item})=>
                <Card style={{backgroundColor: '#EFEFEF', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', borderRadius: 0}} onPress={this.getTip.bind(this,item)}>
                  <View style= {{flex: 1, flexDirection:'row', padding: 5, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 15}}>{item.Titulo}</Text>
                    <Text style={{flex: 1, fontSize: 15, marginLeft: 40}}>{item.Fecha}</Text>
                  </View>

                  <View style= {{flex: 1, flexDirection:'row', padding: 6, marginLeft: 6}}>
                    <Text style={{flex: 1, fontSize: 15}}>{`Nivel: ${item.Curso}`}</Text> 
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
  header: {
    marginTop: Constant.statusBarHeight,
    height: 60,
    backgroundColor: '#FFBD3A', 
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column'
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
    marginLeft: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F1AA54',
    borderColor: '#F1AA54',
    borderWidth: 1,
    borderRadius: 2,
    width: '93%',
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
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    width: '93%',
    height: 42,
    padding: 10,
    backgroundColor: '#F0648C',
    borderColor: '#F0648C',
    flexDirection: 'row',
    opacity: 0.9
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
    marginTop: 6,
    marginLeft: 6,
    paddingVertical: 4,
    width: 60,
    backgroundColor: '#1C355E',
    borderRadius: 16,
    height: 22,
  },
  BtnText: {
    paddingHorizontal: 3,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  ContainerActTips: {
    flex: 1,
    marginTop: 6,
    marginLeft: 12,
    borderColor: '#8CC63F',
    borderWidth: 1,
    borderRadius: 4,
    width: '93%',
    height: 402,
    padding: 7,
    opacity: 0.8,
    backgroundColor: '#8CC63F',
    flexDirection: 'column'
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginLeft: 7,
    fontSize: 12,
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
    fontSize: 12,
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
