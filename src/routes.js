import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import {createDrawerNavigator} from 'react-navigation-drawer';

import ViewNote from './pages/Notepad/ViewNote';
import AddNote from './pages/Notepad/AddNote';
import Calendar from './pages/Calendar';

const corFocus = '#303030';
const corSemFocus = '#808080';
const iconSize = 30;

const Notepad = () => createStackNavigator({
  ViewNoteNavigator: {
    screen: ViewNote,
  },
  AddNoteNavigator: {
    screen: AddNote,
  },
}, { headerMode: 'none' });

const TabNavigator = createBottomTabNavigator({
  NotepadPage: {
    screen: Notepad(),
    navigationOptions: () => ({
      title: 'Notas',
      tabBarIcon: ({focused}) => (
        <Icon
          name="home"
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
  // ViewNote: {
  //   screen: ViewNote,
  //   navigationOptions: () => ({
  //     title: 'Início',
  //     tabBarIcon: ({ focused }) => (
  //       <Icon
  //         name="home"
  //         size={iconSize}
  //         color={focused ? corFocus : corSemFocus}
  //       />
  //     ),
  //   }),
  // },
  // AddNote: {
  //   screen: AddNote,
  //   navigationOptions: () => ({
  //     title: 'Adiciona',
  //     tabBarIcon: ({focused}) => (
  //       <Icon
  //         name="plus-square"
  //         size={iconSize}
  //         color={focused ? corFocus : corSemFocus}
  //       />
  //     ),
  //   }),
  // },
});

export default createAppContainer(TabNavigator);

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
