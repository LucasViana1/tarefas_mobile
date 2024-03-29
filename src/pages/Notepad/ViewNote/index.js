/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  Container,
  Card,
  PanelTime,
  Time,
  Description,
  PanelDescription,
  PanelButtonType,
  Button,
  LabelButton,
  TitleButtonType,
  ButtonIcon,
  LabelButtonNew,
  ViewButtonNew,
  ButtonNew,
} from './styles';
import {useSelector,useDispatch} from 'react-redux';

import Head from '../../../components/Header';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ViewNote = ({ navigation }) => {
  const [notes, setNotes] = useState([]); // lista de notas
  const [numLines, setNumLines] = useState(2); // limite linhas exibidas no card
  const [loadSpinner, setLoadSpinner] = useState(false); // ativa/desativa spinner (em testes)

  const login = useSelector(state => state.user.login);// nome user
  const dispatch = useDispatch(); // dispara açãoes ao redux

  // atividade de edição ou adicionar nota
  function addOrEdit(id, option) {
    // a action poderia ser separado, retornando um objeto
    const actionAddOrEdit = () =>{
      if(option === 'edit')
        return {type: 'ALTER_ADD_OR_EDIT', textButton: 'EDITAR', id}
      else 
        return {type: 'ALTER_ADD_OR_EDIT', textButton: 'ADICIONAR', id}
    }
    dispatch(actionAddOrEdit());
  }
  async function changeColor(newType, id) {
    let allNotes = notes;
    for (let i = 0; i < allNotes.length; i++) {
      if (allNotes[i].id === id) {
        allNotes[i].typeNote = newType;   
        break;
      }
    }
    await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
  }
  async function loadNotes() {
    // await AsyncStorage.removeItem('notes');
    // await AsyncStorage.removeItem('contNotes');
    let allNotes = JSON.parse(await AsyncStorage.getItem('notes'));
    if (allNotes === null) allNotes = [];
    setNotes(allNotes);
  }
  useEffect(() => {
    setLoadSpinner(true);
    loadNotes();
    setLoadSpinner(false);
  });
  function dateTimeEdit(date, time){
    let resp = '';
    if(date === '' || date === null || time === '' || time === null){
      resp = `sem registro.`;
    }
    else {
      resp = `${date} às ${time}.`;
    }
    
    return resp;
  }
  function spinner(){
    if(loadSpinner){
      return <ActivityIndicator size={110} animating={true}
          style={{
            flex: 1, 
            position: 'absolute', 
            backgroundColor: 'rgba(10,23,55,0.2)', 
            height: screenHeight,
            width: screenWidth,
            zIndex: 1,
          }}
        />
    }
  }
  async function removeNote(id){
    const contIdNotes = parseInt(await AsyncStorage.getItem('contNotes'), 10);
    let allNotes = notes;
    Alert.alert(
      'Atenção!',
      'Tem certeza que deseja apagar essa nota?',
      [
        {text: 'SIM', onPress: async () => {
          for (let i = 0; i < contIdNotes; i++) {
            if (allNotes[i].id === id) {
              allNotes.splice(i, 1);
              await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
              break;
            }
          }
        }},
        {text: 'NÃO', onPress: () => {}}
      ],
      {cancelable: false},
    );
  }

  return (
    <Container>
      <Head />
      {spinner()}
      <Text>{login}</Text>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Card type={item.typeNote} 
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
          >      
            <PanelTime>
              <View>
                <Time>Criado: {item.creationDate} às {item.creationTime}.</Time>
                <Time>Editado: {dateTimeEdit(item.updateDate,item.updateTime)}</Time>              
              </View>
              <ButtonIcon onPress={ () => {
                addOrEdit(item.id, 'edit');
                navigation.navigate('AddNoteNavigator')
              }}>
                <Icon name="edit" size={26} />
              </ButtonIcon>
              <ButtonIcon onPress={ async () => removeNote(item.id)}>
                <Icon name="trash" size={26} />
              </ButtonIcon>
              <ButtonIcon>
                <Icon name="signal" size={26} />
              </ButtonIcon>
            </PanelTime>
            <PanelDescription onPress={() => numLines === 0 ? setNumLines(2) : setNumLines(0) }>
              <Description viewAll={numLines}>{item.text}</Description>
            </PanelDescription>
            <PanelButtonType>
              <TitleButtonType>MUDANÇA DE PRIORIDADE: </TitleButtonType>
              <Button onPress={() => changeColor('Urgente', item.id)} color='red'>
                <LabelButton>{' '}</LabelButton>
              </Button>
              <Button onPress={() => changeColor('Atenção', item.id)} color='yellow'>
                <LabelButton>{' '}</LabelButton>
              </Button>
              <Button onPress={() => changeColor('Comum', item.id)} color='green'>
                <LabelButton>{' '}</LabelButton>
              </Button>
            </PanelButtonType>
          </Card>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <ButtonNew
        onPress={ () =>{
          setLoadSpinner(true);
          addOrEdit(0, 'add');
          navigation.navigate('AddNoteNavigator')
          setLoadSpinner(false);
        }}>
          <LabelButtonNew>+</LabelButtonNew>
      </ButtonNew>
    </Container>
  );
};

export default ViewNote;
