import {FormControl, Input, Stack, WarningOutlineIcon} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const AppInput = ({
  style,
  props,
  placeholder = 'placeholder',
  type,
  helpertext = '',
  errorMessage = '',
  errorMessageSize,
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
      <FormControl.HelperText>{helpertext}</FormControl.HelperText>
      <FormControl.ErrorMessage
        leftIcon={<WarningOutlineIcon size={errorMessageSize || 'xs'} />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(AppInput);
