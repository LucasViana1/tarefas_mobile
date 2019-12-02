import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Title, Container, TextArea, Header, Button} from './styles';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import getRealm from '../../../service/realm';

const addNote = () => {
  const [text, setText] = useState('');
  const [textTemp, setTextTemp] = useState('');
  const [controlLines, setControlLines] = useState(1);

  useEffect(() => {
    // console.warn(text.length);
    // console.warn(text);
    // setControlLines(controlLines + 1);
  });

  const getDate = () => {
    const date = new Date();
    const dia = '00' + date.getDate();
    const mes = '00' + (date.getMonth() + 1);
    const ano = date.getFullYear();
    // const fullDate = dia.slice(-2) + '/' + mes.slice(-2) + '/' + ano;
    const fullDate = `${dia.slice(-2)}/${mes.slice(-2)}/${ano}`;

    return fullDate;
  };

  async function addNotes() {
    const insert = {
      id: 5,
      name: 'fernanda',
      text: 'texto inserido por fernanda',
      createdAt: '05/11/2018',
    };
    const realm = await getRealm();
    realm.write(() => {
      realm.create('Notes', insert);
    });
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity>
          <Icon
            name="bars"
            size={36}

            // color={focused ? corFocus : corSemFocus}
          />
        </TouchableOpacity>
      </Header>
      <ScrollView style={{flex: 1}}>
        <TextArea
          value={textTemp}
          multiline={true}
          numberOfLines={controlLines}
          placeholder="Insira suas anotações aqui :)"
          onChangeText={text => {
            setText(text);
            setTextTemp(text);
            if (parseInt(text.length * 0.06) == controlLines)
              setControlLines(controlLines + 1);
            // console.warn(parseInt(text.length * 0.05));
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Button
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={addNotes}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
              ADICIONAR
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

export default addNote;
