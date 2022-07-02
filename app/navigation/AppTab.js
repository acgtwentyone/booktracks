import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTabScreenOptions} from '../hooks';
import {TABS_NAME} from '../Utils';
import {
  BooksStack,
  FavStack,
  HomeStack,
  NotesStack,
  SettingsStack,
} from './StackNavigator';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  const {screenOptions} = useTabScreenOptions();
  const {books, favourities, home, notes, settings} = TABS_NAME;
  const defaultOptions = {tabBarLabel: ''};

  return (
    <Tab.Navigator initialRouteName={books} screenOptions={screenOptions}>
      {/* <Tab.Screen name={home} component={HomeStack} options={defaultOptions} /> */}
      <Tab.Screen
        name={books}
        component={BooksStack}
        options={defaultOptions}
      />
      {/* <Tab.Screen
        name={favourities}
        component={FavStack}
        options={defaultOptions}
      />
      <Tab.Screen
        name={notes}
        component={NotesStack}
        options={defaultOptions}
      />
      <Tab.Screen
        name={settings}
        component={SettingsStack}
        options={defaultOptions}
      /> */}
    </Tab.Navigator>
  );
};

export default AppTab;
