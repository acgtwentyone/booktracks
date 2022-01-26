import React from 'react';
import {Text} from 'native-base';
import {StyleSheet} from 'react-native';

const ErrorMessage = ({style, props, name, message, errors}) => (
  <>
    {errors[name] && (
      <Text style={[styles.container, {...style}]} {...props}>
        {message}
      </Text>
    )}
  </>
);

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ErrorMessage);
