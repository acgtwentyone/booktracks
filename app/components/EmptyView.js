import {Box, Icon, Text} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyView = ({iconName, isIcon = true, props, title}) => {
  return (
    <Box p={5} alignItems="center" flex={1} {...props} justifyContent="center">
      {isIcon && (
        <Icon
          as={MaterialCommunityIcons}
          name={iconName ? iconName : 'database-search'}
          size={16}
        />
      )}
      <Text m={2} fontSize="md">
        {title ? title : 'No records could be found ...'}
      </Text>
    </Box>
  );
};

export default EmptyView;
