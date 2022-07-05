import React from 'react';
import {Badge, HStack, Text} from 'native-base';

const AppBadge = ({
  children,
  inverse = false,
  title,
  my = '0',
  mx = '0',
  mt = '0',
  mb = '0',
}) => {
  return (
    <HStack mt={mt} my={my} mx={mx} mb={mb}>
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
