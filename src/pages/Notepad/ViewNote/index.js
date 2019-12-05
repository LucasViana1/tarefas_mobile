import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
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
} from './styles';

import Head from '../../../components/Header';

const ViewNote = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  async function loadNotes() {
    // await AsyncStorage.removeItem('notes');
    // await AsyncStorage.removeItem('contNotes');
    let allNotes = JSON.parse(await AsyncStorage.getItem('notes'));
    if (allNotes === null) allNotes = [];
    setNotes(allNotes);
    // console.warn(allNotes);
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
    // setNotes(allNotes);
  }
  useEffect(() => {
    loadNotes();
  });
  return (
    <Container>
      <Head />
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
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              <Time>{item.createdAt} às {item.time}</Time>
              <ButtonIcon>
                <Icon name="edit" size={26} />
              </ButtonIcon>
              <ButtonIcon>
                <Icon name="trash" size={26} />
              </ButtonIcon>
              <ButtonIcon>
                <Icon name="signal" size={26} />
              </ButtonIcon>
            </PanelTime>
            <PanelDescription>
              <Description>{item.text}</Description>
            </PanelDescription>
            <PanelButtonType>
              <TitleButtonType>MUDANÇA DE PRIORIDADE: </TitleButtonType>
              <Button onPress={() => changeColor('Urgente', item.id)} style={{ backgroundColor: 'red' }}>
                <LabelButton>{' '}</LabelButton>
              </Button>
              <Button onPress={() => changeColor('Atenção', item.id)} style={{ backgroundColor: 'yellow' }}>
                <LabelButton>{' '}</LabelButton>
              </Button>
              <Button onPress={() => changeColor('Comum', item.id)} style={{ backgroundColor: 'green' }}>
                <LabelButton>{' '}</LabelButton>
              </Button>
            </PanelButtonType>
          </Card>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={{alignItems: 'center'}} onPress={ () =>{
        navigation.navigate('AddNoteNavigator')
      }}>
        <Text style={{fontSize: 50, fontWeight: 'bold'}}>+</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default ViewNote;
