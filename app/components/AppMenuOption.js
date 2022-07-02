import React from 'react';
import {HStack, Icon, Menu, Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppTouchableOpacity} from '.';

const AppMenuOption = ({icon, title, onPress}) => {
  return (
    <Menu.Item>
      <AppTouchableOpacity onPress={onPress}>
        <HStack display="flex" alignItems="center">
          <Icon as={MaterialCommunityIcons} name={icon} size="xs" />
          <Text ml={4}>{title}</Text>
        </HStack>
      </AppTouchableOpacity>
    </Menu.Item>
  );
};

export default React.memo(AppMenuOption);
