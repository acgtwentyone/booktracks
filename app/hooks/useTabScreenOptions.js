import React from 'react';
import {useColorModeValue, Icon} from 'native-base';
import {TABS_NAME} from '../Utils';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const useTabScreenOptions = () => {
  const iconColor = useColorModeValue('#000', '#FFF');
  const tabBg = useColorModeValue('#FFF', '#000');

  let screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName;

      if (route.name === TABS_NAME.home) {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === TABS_NAME.books) {
        iconName = focused ? 'book' : 'book-outline';
      } else if (route.name === TABS_NAME.pages) {
        iconName = focused ? 'page-next' : 'page-next-outline';
      } else if (route.name === TABS_NAME.favourities) {
        iconName = focused ? 'star-circle' : 'star-circle-outline';
      } else if (route.name === TABS_NAME.settings) {
        iconName = focused
          ? 'dots-vertical-circle'
          : 'dots-vertical-circle-outline';
      }
      return (
        <Icon
          as={MaterialCommunityIcons}
          name={iconName}
          color={iconColor}
          size={size}
        />
      );
    },
    headerShown: false,
    tabBarStyle: {
      backgroundColor: tabBg,
    },
  });

  return {screenOptions};
};

export default useTabScreenOptions;
