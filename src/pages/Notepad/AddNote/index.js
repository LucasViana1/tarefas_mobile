import React, { useState, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  TextArea,
  Button,
  Body,
  PanelButton,
  PanelSelect,
  LabelButton,
  Select,
  LabelSelect,
} from './styles';
import {useSelector} from 'react-redux';
// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

import Head from '../../../components/Header';

const AddNote = ({ navigation }) => {
  const [text, setText] = useState('');
  const [textTemp, setTextTemp] = useState('');
  const [controlLines, setControlLines] = useState(1);
  const [typeNote, setTypeNote] = useState('Comum');

  const name = useSelector(state => state.user.login);
  const textButton = useSelector(state => state.addOrEdit.operation);

  const getDate = () => {
    const date = new Date();
    const dia = `00${date.getDate()}`;
    const mes = `00${date.getMonth() + 1}`;
    const ano = date.getFullYear();
    const fullDate = `${dia.slice(-2)}/${mes.slice(-2)}/${ano}`;
    return fullDate;
  };
  const getTime = () => {
    const date = new Date();
    const hora = `00${date.getHours()}`;
    const minuto = `00${date.getMinutes()}`;
    const fullTime = `${hora.slice(-2)}:${minuto.slice(-2)}`;
    return fullTime;
  };
  const addNotes = async () =>{
    let contNotes = parseInt(await AsyncStorage.getItem('contNotes'), 10);
    if (contNotes === null || Number.isNaN(contNotes)) {
      contNotes = 1;
    }
    const ins = {
      id: contNotes,
      name,
      text,
      typeNote,
      time: getTime(),
      createdAt: getDate(),
    };
    const notesObjTemp = JSON.parse(await AsyncStorage.getItem('notes')) || []; // pega os valores armazenados atualmente
    notesObjTemp.push(ins); // insere novo registro
    await AsyncStorage.setItem('notes', JSON.stringify(notesObjTemp)); // colocar o total + novo registro no asyncstorage
    contNotes++; // aumenta contador de qtd de notas salvas
    await AsyncStorage.setItem('contNotes', contNotes.toString());
  }

  return (
    <Container>
      <Head />
      <Text>{name}</Text>
      <Body>
        <TextArea
          valueSelect={typeNote}
          value={textTemp}
          multiline
          numberOfLines={controlLines}
          placeholder="Insira suas anotações aqui :)"
          // eslint-disable-next-line arrow-parens
          onChangeText={insertText => {
            setText(insertText);
            setTextTemp(insertText);
            if (parseInt(insertText.length * 0.06, 10) === controlLines) {
              setControlLines(controlLines + 1);
            }
          }}
        />
        <PanelSelect>
          <LabelSelect>Escolha o tipo da nota:</LabelSelect>
          <Select
            selectedValue={typeNote}
            onValueChange={(itemValue, itemPosition) => setTypeNote(itemValue)}>
            <Select.Item label="Urgente" value="Urgente" />
            <Select.Item label="Atenção" value="Atenção" />
            <Select.Item label="Comum" value="Comum" />
          </Select>
        </PanelSelect>
        <PanelButton>
          <Button onPress={() => {
            addNotes();
            Alert.alert(
              '',
              'Nova nota adicionada com sucesso!',
              [{text: 'OK', onPress: () => navigation.navigate('ViewNoteNavigator')}],
              {cancelable: false},
            );
          }}>
            <LabelButton>{textButton}</LabelButton>
          </Button>
        </PanelButton>
      </Body>
    </Container>
  );
};

export default AddNote;

// const values = [
//   {
//     id: 1,
//     nome: 'lucas',
//     gosta: {
//       linguagem: 'js',
//       ferramenta: 'react',
//     },
//   },
//   {
//     id: 2,
//     nome: 'kallynne',
//     gosta: {
//       linguagem: 'java',
//       ferramenta: 'eclipse',
//     },
//   },
// ];
// await AsyncStorage.setItem('key', JSON.stringify(values));
// const x = await AsyncStorage.getItem('key');
// const y = JSON.parse(x);
// console.warn(y[1].gosta.linguagem);
