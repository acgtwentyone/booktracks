import React from 'react';
import {Actionsheet, Box} from 'native-base';
import {StyleSheet} from 'react-native';

const ActionSheet = ({style, props, isOpen, onClose, children, reference}) => {
  return (
    <>
      <Actionsheet
        ref={reference}
        isOpen={isOpen}
        onClose={onClose}
        disableOverlay
        style={[styles.container, {...style}]}
        {...props}>
        <Actionsheet.Content>
          <Box w="100%" px={4} justifyContent="center">
            {children}
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ActionSheet);
