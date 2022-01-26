import {Box} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const Screen = ({children, style, props}) => {
  return (
    <Box
      style={[styles.container, {...style}]}
      {...props}
      _dark={{bg: '#000'}}
      _light={{bg: '#FFF'}}>
      {children}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default Screen;
