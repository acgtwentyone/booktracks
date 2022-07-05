import React from 'react';
import {Button, Text} from 'native-base';

const SubmitButton = ({
  style,
  props,
  title,
  size,
  handleSubmit,
  onSubmit,
  progress,
  showProgressIndicator,
  isLoadingText = 'Submitting',
}) => (
  <>
    {!progress || !showProgressIndicator ? (
      <Button
        size={size || 'lg'}
        {...props}
        onPress={handleSubmit(onSubmit)}
        m={4}
        shadow={2}>
        <Text>{title}</Text>
      </Button>
    ) : (
      showProgressIndicator && (
        <Button
          isLoading
          isLoadingText={isLoadingText}
          _loading={{
            bg: 'primary',
            _text: {
              color: 'white',
            },
          }}
          _spinner={{
            color: 'white',
          }}
        />
      )
    )}
  </>
);

export default React.memo(SubmitButton);
