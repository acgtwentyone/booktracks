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
  variant,
  m,
}) => {
  return (
    <Stack m={m ? m : '2'}>
      <TextArea
        h={h ? h : '100%'}
        w={w ? w : '100%'}
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
