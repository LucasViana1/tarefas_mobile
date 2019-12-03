import React, {useState, useEffect} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  TextArea,
  Header,
  Button,
  Body,
  Panel,
  LabelButton,
} from './styles';

// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

// import getRealm from '../../../service/realm';

const AddNote = () => {
  const [text, setText] = useState('');
  const [textTemp, setTextTemp] = useState('');
  const [controlLines, setControlLines] = useState(1);
  const [notes, setNotes] = useState([]);
  const name = 'Lucas';

  useEffect(() => {
    async function loadNotes() {
      // const realm = await getRealm();
      // const data = realm.objects('Notes');
      // ATT WITH ASYNCSTORAGE
      const data = await AsyncStorage.getItem('notes');
      setNotes(data);
    }
    loadNotes();
  });

  // useEffect(() => {
  //   // console.warn(text.length);
  //   // console.warn(getDate());
  //   // setControlLines(controlLines + 1);
  // });

  const getDate = () => {
    const date = new Date();
    const dia = `00${date.getDate()}`;
    const mes = `00${date.getMonth() + 1}`;
    const ano = date.getFullYear();
    // const fullDate = dia.slice(-2) + '/' + mes.slice(-2) + '/' + ano;
    const fullDate = `${dia.slice(-2)}/${mes.slice(-2)}/${ano}`;

    return fullDate;
  };

  async function addNotes() {
    // const insert = [
    //   // id: notes.length + 1, // qtd de registros locais +1
    //   {
    //     id: 0,
    //     name,
    //     text,
    //     createdAt: getDate(),
    //   },
    //   {
    //     id: 1,
    //     name,
    //     text,
    //     createdAt: getDate(),
    //   },
    // ];
    // condição para primeiro registro
    // let notesAmount;
    // if (notes != null) {
    //   notesAmount = notes.length;
    // } else {
    //   notesAmount = 0;
    // }
    let contNotes = (await AsyncStorage.getItem('contNotes')).toString();
    if (contNotes === null) {
      contNotes = 1;
    }
    // console.warn(contNotes);
    const ins = {
      id: contNotes,
      name,
      text,
      createdAt: getDate(),
    };

    // const realm = await getRealm();
    // realm.write(() => {
    //   realm.create('Notes', insert);
    // });
    // ATT WITH ASYNCSTORAGE

    // await AsyncStorage.setItem('notes', JSON.stringify(insert)); // usado para testes, para inicializar
    const notesObjTemp = JSON.parse(await AsyncStorage.getItem('notes')) || []; // pega os valores armazenados atualmente
    notesObjTemp.push(ins); // insere novo registro
    await AsyncStorage.setItem('notes', JSON.stringify(notesObjTemp)); // colocar o total + novo registro no asyncstorage
    // aumenta contador de qtd de notas salvas
    contNotes = contNotes + 1;
    console.warn(typeof contNotes);
    //CONTINUAR A PARTIR DAQ
    await AsyncStorage.setItem('contNotes', contNotes.toString());

    console.warn(await AsyncStorage.getItem('notes'));
    // await AsyncStorage.removeItem('notes');

    // const insercao = await AsyncStorage.setItem(
    //   'notes',
    //   JSON.stringify(insert),
    // );
    // console.warn(await AsyncStorage.getItem('notes'));

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
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity>
          <Icon name="bars" size={36} />
        </TouchableOpacity>
      </Header>
      <Body>
        <TextArea
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
            // console.warn(parseInt(text.length * 0.05));
          }}
        />
        <Panel>
          <Button onPress={addNotes}>
            <LabelButton>ADICIONAR</LabelButton>
          </Button>
        </Panel>
      </Body>
    </Container>
  );
};

export default AddNote;
