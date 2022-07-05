import {TextArea, Stack} from 'native-base';
import React from 'react';

const AppTextArea = ({
  style,
  props,
  placeholder = 'placeholder',
  type,
  onChangeText,
  value,
  onBlur,
  h = '100%',
  w = '100%',
  variant,
  m = '0',
  fontSize = 'md',
}) => {
  return (
    <Stack m={m}>
      <TextArea
        fontSize={fontSize}
        h={h}
        w={w}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        size="lg"
        {...props}
        variant={variant ? variant : 'unstyled'}
      />
    </Stack>
  );
};

export default React.memo(AppTextArea);
