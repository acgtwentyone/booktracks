import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTabScreenOptions} from '../hooks';
import {TABS_NAME} from '../Utils';
import {
  BooksStack,
  FavStack,
  HomeStack,
  PagesStack,
  SettingsStack,
} from './StackNavigator';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  const {screenOptions} = useTabScreenOptions();

  return (
    <Tab.Navigator
      initialRouteName={TABS_NAME.home}
      screenOptions={screenOptions}>
      <Tab.Screen
        name={TABS_NAME.home}
        component={HomeStack}
        options={{tabBarLabel: ''}}
      />
      <Tab.Screen
        name={TABS_NAME.books}
        component={BooksStack}
        options={{tabBarLabel: ''}}
      />
      <Tab.Screen
        name={TABS_NAME.pages}
        component={PagesStack}
        options={{tabBarLabel: ''}}
      />
      <Tab.Screen
        name={TABS_NAME.favourities}
        component={FavStack}
        options={{tabBarLabel: ''}}
      />
      <Tab.Screen
        name={TABS_NAME.settings}
        component={SettingsStack}
        options={{tabBarLabel: ''}}
      />
    </Tab.Navigator>
  );
};

export default AppTab;
