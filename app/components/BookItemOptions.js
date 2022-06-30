import {Icon, Text, useColorModeValue, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppTouchableOpacity} from '.';

const BookItemOptions = ({onStarPress, last_readed_page, favourity}) => {
  const _favColor = useColorModeValue('yellow.500', 'yellow.500');
  const _notFavColor = useColorModeValue('black', 'white');

  return (
    <VStack
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-end">
      <Text fontSize="sm">Page {last_readed_page}</Text>
      <AppTouchableOpacity onPress={onStarPress} style={styles.favIcon}>
        <Icon
          as={MaterialCommunityIcons}
          name="star-outline"
          size="xs"
          color={favourity ? _favColor : _notFavColor}
        />
      </AppTouchableOpacity>
    </VStack>
  );
};

const styles = StyleSheet.create({
  favIcon: {
    marginTop: 16,
  },
});

export default React.memo(BookItemOptions);
