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
  variant = 'solid',
  m = '4',
  px = '4',
  py = '2',
}) => (
  <>
    {!progress || !showProgressIndicator ? (
      <Button
        size={size || 'lg'}
        {...props}
        onPress={handleSubmit(onSubmit)}
        m={m}
        px={px}
        py={py}
        shadow={2}
        variant={variant}>
        <Text>{title}</Text>
      </Button>
    ) : (
      showProgressIndicator && (
        <Button
          m={m}
          px={px}
          py={py}
          variant={variant}
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
