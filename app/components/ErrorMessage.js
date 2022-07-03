import React from 'react';
import {Text, useColorModeValue} from 'native-base';

const ErrorMessage = ({props, error}) => {
  const color = useColorModeValue('red.500', 'white');
  return (
    <>
      {error && (
        <Text mt={2} color={color} {...props} fontSize="md">
          {error}
        </Text>
      )}
    </>
  );
};

export default React.memo(ErrorMessage);
