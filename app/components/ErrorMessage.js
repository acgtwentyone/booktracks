import React from 'react';
import {Text, useColorModeValue} from 'native-base';

const ErrorMessage = ({props, name, errors}) => {
  const color = useColorModeValue('red.500', 'white');

  return (
    <>
      {errors[name] && (
        <Text mt={2} color={color} {...props}>
          {errors[name].message}
        </Text>
      )}
    </>
  );
};

export default React.memo(ErrorMessage);
