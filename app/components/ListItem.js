import {Box, HStack} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const ListItem = ({content, onItemPress}) => {
  return (
    <TouchableOpacity onPress={onItemPress} style={styles.touchable}>
      <Box
        borderBottomWidth="0.5"
        _dark={{
          borderColor: 'gray.600',
        }}
        borderColor="coolGray.200"
        my={3}
        mx={4}
        pb={7}>
        <HStack space={3} justifyContent="space-between">
          {content}
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  touchable: {
    flex: 1,
  },
});

export default React.memo(ListItem);
