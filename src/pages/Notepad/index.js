import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Title, Container} from './styles';
// import getRealm from '../../service/realm';

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadNotes() {
      // const realm = await getRealm();
      // const data = realm.objects('Notes');
      setNotes(JSON.parse(await AsyncStorage.getItem('notes')));
      // ATT WITH ASYNCSTORAGE
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <FlatList
        data={notes}
        renderItem={({item}) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.text}</Text>
            <Text>{item.createdAt}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
};

export default Home;
