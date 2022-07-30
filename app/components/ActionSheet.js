import React from 'react';
import {Actionsheet, Box} from 'native-base';

const ActionSheet = ({props, isOpen, onClose, children, reference}) => {
  return (
    <>
      <Actionsheet
        ref={reference}
        isOpen={isOpen}
        onClose={onClose}
        disableOverlay
        {...props}>
        <Actionsheet.Content>
          <Box w="100%" p="4" justifyContent="center">
            {children}
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default React.memo(ActionSheet);
