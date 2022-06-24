import React from 'react';
import {Button, HStack, Text} from 'native-base';
import {AppActivityIndicator} from './';

const SubmitButton = ({
  style,
  props,
  title,
  size,
  handleSubmit,
  onSubmit,
  progress,
  showProgressIndicator,
}) => (
  <Button
    size={size || 'lg'}
    {...props}
    onPress={handleSubmit(onSubmit)}
    m={4}
    shadow={2}>
    <HStack alignItems="center">
      {progress && showProgressIndicator && <AppActivityIndicator m={0} />}
      <Text>{title}</Text>
    </HStack>
  </Button>
);

export default React.memo(SubmitButton);
