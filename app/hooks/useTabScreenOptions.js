import React from 'react';
import {useColorModeValue, Icon, Text, VStack} from 'native-base';
import {SCREEN_TITLES, TABS_NAME} from '../Utils';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const useTabScreenOptions = () => {
  const iconColor = useColorModeValue('#000', '#FFF');
  const tabBg = useColorModeValue('#FFF', '#000');

  let screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName = null;
      let name = null;

      if (route.name === TABS_NAME.books) {
        iconName = focused ? 'book' : 'book-outline';
        name = SCREEN_TITLES.books;
      } else if (route.name === TABS_NAME.notes) {
        iconName = focused ? 'page-next' : 'page-next-outline';
        name = SCREEN_TITLES.notes;
      } else if (route.name === TABS_NAME.favourities) {
        iconName = focused ? 'star-circle' : 'star-circle-outline';
        name = SCREEN_TITLES.favourities;
      }
      return (
        <VStack alignItems="center">
          <Icon
            as={MaterialCommunityIcons}
            name={iconName}
            color={iconColor}
            size={size}
          />
          <Text>{name}</Text>
        </VStack>
      );
    },
    headerShown: false,
    tabBarStyle: {
      backgroundColor: tabBg,
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 16,
    },
  });

  return {screenOptions};
};

export default useTabScreenOptions;
