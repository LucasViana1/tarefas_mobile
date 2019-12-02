import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Notepad from './pages/Notepad';
import AddNote from './pages/Notepad/AddNote';
import Calendar from './pages/Calendar';

const corFocus = '#303030';
const corSemFocus = '#808080';
const iconSize = 30;

const AppNavigator = createBottomTabNavigator({
  Notepad: {
    screen: Notepad,
    navigationOptions: () => ({
      title: 'Início',
      tabBarIcon: ({focused}) => (
        <Icon
          name="home"
          size={iconSize}
          color={focused ? corFocus : corSemFocus}
        />
      ),
    }),
  },
  AddNote: {
    screen: AddNote,
    navigationOptions: () => ({
      title: 'Adiciona',
      tabBarIcon: ({focused}) => (
        <Icon
          name="plus-square"
          size={iconSize}
          color={focused ? corFocus : corSemFocus}
        />
      ),
    }),
  },
  CalendarPage: {
    screen: Calendar,
    navigationOptions: () => ({
      title: 'Calendário',
      tabBarIcon: ({focused}) => (
        <Icon
          name="calendar"
          size={iconSize}
          color={focused ? corFocus : corSemFocus}
        />
      ),
    }),
  },
});

export default createAppContainer(AppNavigator);

// const Routes = createAppContainer(
//   createBottomTabNavigator(
//     {Home, Calendar},
//     {
//       headerLayoutPreset: 'center',
//       headerBackTitleVisible: false,
//       defaultNavigationOptions: {
//         headerStyle: {
//           backgroundColor: '#fa0000',
//         },
//         headerTintColor: '#0015ff',
//       },
//     },
//   ),
// );

// export default Routes;
