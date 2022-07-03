import React from 'react';
import {Badge, HStack, Text} from 'native-base';

const AppBadge = ({children, inverse = false, title}) => {
  return (
    <HStack mt={4}>
      {inverse && (
        <>
          <Badge ml={2}>{children}</Badge>
          <Text fontSize="md">{title}</Text>
        </>
      )}
      {!inverse && (
        <>
          <Text fontSize="md">{title}</Text>
          <Badge ml={2}>{children}</Badge>
        </>
      )}
    </HStack>
  );
};

export default React.memo(AppBadge);
