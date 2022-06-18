import React from 'react';
import {Button} from 'native-base';

const SubmitButton = ({style, props, title, size, handleSubmit, onSubmit}) => (
  <Button
    size={size || 'lg'}
    {...props}
    onPress={handleSubmit(onSubmit)}
    m={4}
    shadow={2}>
    {title}
  </Button>
);

export default React.memo(SubmitButton);
