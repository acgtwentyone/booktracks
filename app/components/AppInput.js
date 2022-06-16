import {Input, Stack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const AppInput = ({
  style,
  props,
  placeholder = 'placeholder',
  type,
  onChangeText,
  value,
  onBlur,
}) => {
  return (
    <Stack mx="4" style={[styles.container, {...style}]} {...props}>
      <Input
        type={type || 'text'}
        placeholder={placeholder}
        editable={true}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(AppInput);
