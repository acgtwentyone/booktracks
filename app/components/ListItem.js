import {Box, Center, HStack} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_WIDTH} from '../Utils';

const ListItem = ({style, props, content, recent = false, onItemPress}) => {
  return (
    <>
      {recent ? (
        <Box
          borderWidth="0.5"
          _dark={{
            backgroundColor: 'gray.600',
            borderColor: 'gray.600',
          }}
          backgroundColor="coolGray.200"
          borderColor="coolGray.200"
          mx={2}
          _text={{
            color: 'coolGray.800',
          }}>
          <Center w={SCREEN_WIDTH / 2 - 50} h={SCREEN_WIDTH / 2 - 50} p={4}>
            {content}
          </Center>
        </Box>
      ) : (
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
