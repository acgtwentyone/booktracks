import React from 'react';
import {Text} from 'native-base';

const ErrorMessage = ({props, name, errors}) => (
  <>
    <Text color="red.100" {...props}>
      {errors[name]?.message}
    </Text>
  </>
);

export default React.memo(ErrorMessage);
