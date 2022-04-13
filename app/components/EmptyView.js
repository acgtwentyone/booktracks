import {Box, Icon, Text} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyView = ({props, title}) => {
  return (
    <Box p={5} alignItems="center" flex={1} {...props}>
      <Icon as={MaterialCommunityIcons} name="database-search" size={16} />
      <Text m={2}>{title ? title : 'Não há registros ...'}</Text>
    </Box>
  );
};

export default EmptyView;
