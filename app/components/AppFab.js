import React from 'react';
import {Icon, Box, useColorModeValue, Center, Fab} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AppFab = ({style, props, label, iconName, iconSize, onPress}) => {
  const iconColor = useColorModeValue('#000', '#FFF');
  const bgColor = useColorModeValue('primary.100', 'primary.500');
  return (
    <Center>
      <Box
        shadow="2"
        width="100%"
        rounded="lg"
        _dark={{
          bg: bgColor || 'coolGray.200:alpha.20',
        }}
        _light={{
          bg: bgColor || 'coolGray.200:alpha.20',
        }}>
        <Fab
          onPress={onPress}
          renderInPortal={false}
          shadow={2}
          placement="bottom-right"
          size="lg"
          icon={
            <Icon
              color={iconColor}
              as={MaterialIcons}
              name={iconName || 'add'}
              size={iconSize}
            />
          }
          label={label || ''}
        />
      </Box>
    </Center>
  );
};

export default React.memo(AppFab);
