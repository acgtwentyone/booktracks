import {Input, Stack} from 'native-base';
import React from 'react';

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
    <Stack mx="4" {...props}>
      <Input
        type={type || 'text'}
        placeholder={placeholder}
        editable={true}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        size="lg"
      />
    </Stack>
  );
};

export default React.memo(AppInput);
