import {Box, Center} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_WIDTH} from '../Utils';

const ListItem = ({style, props, content, recent = false, onItemPress}) => {
  return (
    <>
      {recent ? (
        <Box
          mx={2}
          _text={{
            color: 'coolGray.800',
          }}>
          <Center
            w={SCREEN_WIDTH / 2 - 50}
            h={SCREEN_WIDTH / 2 - 50}
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}
            p={4}>
            {content}
          </Center>
        </Box>
      ) : (
        <TouchableOpacity onPress={onItemPress} style={styles.touchable}>
          <Box
            p={4}
            mb={6}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}
            style={[styles.container, {...style}]}
            {...props}
            mx={4}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            {content}
          </Box>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  touchable: {
    flex: 1,
  },
});

export default React.memo(ListItem);
