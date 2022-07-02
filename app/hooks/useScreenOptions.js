import React from 'react';
import {Avatar, SearchIcon, useColorModeValue} from 'native-base';

const useScreenOptions = RightComponent => {
  let screenOptions = {
    headerStyle: {
      backgroundColor: useColorModeValue('#FFF', '#000'),
    },
    headerTintColor: useColorModeValue('#000', '#FFF'),
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
    // headerLeft: () => (
    //   <Avatar bg="indigo.500" size="sm">
    //     AV
    //   </Avatar>
    // ),
  };

  if (RightComponent) {
    screenOptions.headerRight = () => <RightComponent />;
  }

  return {screenOptions};
};

export default useScreenOptions;
