import {Box, HStack, Icon, Text} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '.';
import {FONT_SIZE} from '../Utils';

const PageItem = ({
  style,
  props,
  item,
  recent = false,
  onEditPress,
  onDotPress,
}) => {
  const {
    _data: {page, obs},
  } = item;

  const __renderIcon = (name, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{top: 20, right: 10, bottom: 20, left: 12}}>
      <Icon
        as={MaterialCommunityIcons}
        name={name}
        size="xs"
        m={2}
        onPress={onPress}
      />
    </TouchableOpacity>
  );

  const Content = () => (
    <>
      <Box>
        <Text fontSize={FONT_SIZE.font_18} fontWeight="bold">
          {'Page '}
          <Text fontWeight="bold">{page}</Text>
        </Text>
        <Text
          mt={2}
          fontSize={FONT_SIZE.font_15}
          _dark={{
            color: 'white',
          }}
          _light={{
            color: 'gray.600',
          }}>
          {obs}
        </Text>
      </Box>
      {!recent && (
        <HStack justifyContent="flex-end" justifyItems="center">
          {__renderIcon('pencil', onEditPress)}
          {__renderIcon('dots-vertical', onDotPress)}
        </HStack>
      )}
    </>
  );
  return <ListItem content={<Content />} recent={recent} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(PageItem);
