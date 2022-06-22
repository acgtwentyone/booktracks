import React from 'react';
import {TouchableOpacity} from 'react-native';

const AppTouchableOpacity = ({children, hitSlop, props, onPress}) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      hitSlop={hitSlop ? hitSlop : {top: 20, right: 10, bottom: 20, left: 12}}>
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(AppTouchableOpacity);
