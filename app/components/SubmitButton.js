import React from 'react';
import {Button} from 'native-base';
import {StyleSheet} from 'react-native';

const SubmitButton = ({style, props, title, size, handleSubmit, onSubmit}) => (
  <Button
    size={size || 'sm'}
    style={[styles.container, {...style}]}
    {...props}
    onPress={handleSubmit(onSubmit)}
    // variant="outline"
    m={4}>
    {title}
  </Button>
);

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(SubmitButton);
