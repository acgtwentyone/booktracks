import React from 'react';
import {Avatar, SearchIcon, useColorModeValue} from 'native-base';
import {HIT_SLOP} from '../Utils';

const useScreenOptions = (search = true) => {
  let screenOptions = {
    headerStyle: {
      backgroundColor: useColorModeValue('#FFF', '#000'),
    },
    headerTintColor: useColorModeValue('#000', '#FFF'),
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
    headerLeft: () => (
      <Avatar
        bg="indigo.500"
        // source={{
        //   uri: 'https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg',
        // }}
        size="sm">
        AV
      </Avatar>
    ),
  };

  if (search) {
    screenOptions.headerRight = () => (
      <SearchIcon hitSlop={HIT_SLOP} size="sm" />
    );
  }

  return {screenOptions};
};

export default useScreenOptions;
