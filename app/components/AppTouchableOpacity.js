import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const AppTouchableOpacity = ({children, hitSlop, props, onPress, style}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {...style}]}
      {...props}
      onPress={onPress}
      hitSlop={hitSlop ? hitSlop : {top: 20, right: 10, bottom: 20, left: 12}}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(AppTouchableOpacity);
