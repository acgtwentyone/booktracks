import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View, useColorModeValue} from 'native-base';

const AppActivityIndicator = ({bg, style, p = '4', m = '0'}) => {
  const activityIndicatorBg = useColorModeValue('#FFF', '#000');
  return (
    <View bg={bg ? bg : activityIndicatorBg} flex={1} style={style} p={p} m={m}>
      <ActivityIndicator />
    </View>
  );
};

export default React.memo(AppActivityIndicator);
