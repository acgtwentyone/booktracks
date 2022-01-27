import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Box, useColorModeValue, Flex, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FONT_SIZE, HIT_SLOP} from '../Utils';

const AppFab = ({style, props, label, iconName, iconSize, onPress}) => {
  const iconColor = useColorModeValue('#000', '#FFF');
  const bgColor = useColorModeValue('primary.100', 'primary.500');
  return (
    <TouchableOpacity
      style={[styles.container, {...style}]}
      onPress={onPress}
      hitSlop={HIT_SLOP}>
      <Box
        justifyContent="center"
        alignItems="center"
        {...props}
        borderRadius="full"
        backgroundColor={bgColor}
        p={4}
        position="absolute"
        bottom={4}
        right={4}>
        <Flex direction="row" align="center">
          <Icon
            color={iconColor}
            as={<MaterialIcons name={iconName || 'add'} />}
            size={iconSize || 8}
          />
          <Text fontSize={FONT_SIZE.font_18}>{label}</Text>
        </Flex>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(AppFab);
