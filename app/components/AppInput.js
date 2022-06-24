import {Input, Stack} from 'native-base';
import React from 'react';

const AppInput = ({
  mx,
  onBlur,
  onChangeText,
  placeholder = 'placeholder',
  props,
  size,
  type,
  value,
}) => {
  return (
    <Stack mx={mx ? mx : '4'} {...props}>
      <Input
        type={type || 'text'}
        placeholder={placeholder}
        editable={true}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        size={size ? size : 'lg'}
      />
    </Stack>
  );
};

export default React.memo(AppInput);
