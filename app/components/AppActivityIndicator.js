import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View, useColorModeValue} from 'native-base';

const AppActivityIndicator = ({bg, style, m}) => {
  const activityIndicatorBg = useColorModeValue('#FFF', '#000');
  return (
    <View bg={bg ? bg : activityIndicatorBg} flex={1} style={style}>
      <ActivityIndicator />
    </View>
  );
};

export default React.memo(AppActivityIndicator);
