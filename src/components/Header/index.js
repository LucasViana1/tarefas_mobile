import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Head } from './styles';
// import getRealm from '../../service/realm';

const Header = () => {
  return (
    <Head>
      <TouchableOpacity>
        <Icon name="bars" size={36} />
      </TouchableOpacity>
    </Head>
  );
};

export default Header;
