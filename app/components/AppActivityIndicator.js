import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View, useColorModeValue} from 'native-base';

const AppActivityIndicator = () => {
  const activityIndicatorBg = useColorModeValue('#FFF', '#000');
  return (
    <View bg={activityIndicatorBg} flex={1}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(AppActivityIndicator);
