import {Box, HStack, Icon, Text, useColorModeValue} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '.';

const BookItem = ({
  style,
  props,
  item,
  recent = false,
  onEditPress,
  onStarPress,
  onDotPress,
  isFavScreen = false,
}) => {
  const _favColor = useColorModeValue('yellow.500', 'yellow.500');
  const _notFavColor = useColorModeValue('black', 'white');
  const {
    _data: {title, author, favourity},
  } = item;

  const Touchable = ({onPress, children}) => (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{top: 20, right: 10, bottom: 20, left: 12}}>
      {children}
    </TouchableOpacity>
  );

  const __renderStarBtn = () => (
    <Touchable onPress={onStarPress}>
      <Icon
        as={MaterialCommunityIcons}
        name="star-outline"
        size="xs"
        m={2}
        onPress={onStarPress}
        color={favourity ? _favColor : _notFavColor}
      />
    </Touchable>
  );

  const __renderIcon = (name, onPress) => (
    <Touchable onPress={onPress}>
      <Icon
        as={MaterialCommunityIcons}
        name={name}
        size="xs"
        m={2}
        onPress={onPress}
      />
    </Touchable>
  );

  const Content = () => (
    <>
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text
          mt={2}
          fontSize="md"
          _dark={{
            color: 'white',
          }}
          _light={{
            color: 'gray.600',
          }}>
          {author}
        </Text>
      </Box>
      {!recent && !isFavScreen ? (
        <HStack justifyContent="flex-end" justifyItems="center">
          {__renderStarBtn()}
          {__renderIcon('pencil', onEditPress)}
          {__renderIcon('dots-vertical', onDotPress)}
        </HStack>
      ) : !recent ? (
        __renderStarBtn()
      ) : (
        <></>
      )}
    </>
  );

  return <ListItem content={<Content />} recent={recent} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(BookItem);
