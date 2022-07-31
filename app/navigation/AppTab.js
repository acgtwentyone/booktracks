import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTabScreenOptions} from '../hooks';
import {TABS_NAME} from '../Utils';
import {BooksStack, FavStack, NotesStack} from './StackNavigator';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  const {screenOptions} = useTabScreenOptions();
  const {books, favourities, notes} = TABS_NAME;
  const defaultOptions = {tabBarLabel: ''};

  return (
    <Tab.Navigator initialRouteName={books} screenOptions={screenOptions}>
      <Tab.Screen
        name={books}
        component={BooksStack}
        options={defaultOptions}
      />
      <Tab.Screen
        name={favourities}
        component={FavStack}
        options={defaultOptions}
      />
      <Tab.Screen
        name={notes}
        component={NotesStack}
        options={defaultOptions}
      />
    </Tab.Navigator>
  );
};

export default AppTab;
