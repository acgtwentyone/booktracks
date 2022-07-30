import {HStack, Input, Stack, Text, VStack} from 'native-base';
import React from 'react';
import {APP_INPUT_ALIGN_LABEL} from '../Utils';

const AppInput = ({
  mx,
  onBlur,
  onChangeText,
  placeholder = '',
  props,
  size,
  type,
  value,
  variant,
  label,
  alignLabel = APP_INPUT_ALIGN_LABEL.horizontal,
  showLabel = false,
  placeholderTextColor = 'gray',
  inputW = 'full',
  keyboardType = 'default',
}) => {
  const __renderInput = () => (
    <Input
      type={type || 'text'}
      placeholder={placeholder}
      editable={true}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      size={size ? size : 'lg'}
      variant={variant ? variant : 'unstyled'}
      placeholderTextColor={placeholderTextColor}
      w={inputW}
      keyboardType={keyboardType}
    />
  );

  const labelAlign = APP_INPUT_ALIGN_LABEL[alignLabel];

  return (
    <Stack mx={mx ? mx : '4'} {...props}>
      {!label || !showLabel ? (
        __renderInput()
      ) : labelAlign === APP_INPUT_ALIGN_LABEL.horizontal ? (
        <HStack display="flex" alignItems="center">
          <Text fontSize="md" mr={4}>
            {label}
          </Text>
          {__renderInput()}
        </HStack>
      ) : (
        <VStack>
          <Text fontSize="md" mb={2}>
            {label}
          </Text>
          {__renderInput()}
        </VStack>
      )}
    </Stack>
  );
};

export default React.memo(AppInput);
