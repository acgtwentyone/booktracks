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
  h,
  w,
  maxW,
}) => {
  return (
    <Stack mx="4" {...props}>
      <TextArea
        h={h ? h : 20}
        w={w ? w : '100%'}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        size="lg"
      />
    </Stack>
  );
};

export default React.memo(AppTextArea);
