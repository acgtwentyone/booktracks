import {Box, HStack, Icon, Text, useColorModeValue} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '.';
import {FONT_SIZE} from '../Utils';

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

  const Content = () => (
    <>
      <Box>
        <Text fontSize={FONT_SIZE.font_18}>{title}</Text>
        <Text
          mt={2}
          fontSize={FONT_SIZE.font_15}
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
          <Icon
            as={MaterialCommunityIcons}
            name="star-outline"
            size="xs"
            m={2}
            onPress={onStarPress}
            color={favourity ? _favColor : _notFavColor}
          />

          <Icon
            as={MaterialCommunityIcons}
            name="pencil"
            size="xs"
            m={2}
            onPress={onEditPress}
          />

          <Icon
            as={MaterialCommunityIcons}
            name="dots-vertical"
            size="xs"
            m={2}
            onPress={onDotPress}
          />
        </HStack>
      ) : (
        <Icon
          as={MaterialCommunityIcons}
          name="star-outline"
          size="xs"
          m={2}
          onPress={onStarPress}
          color={favourity ? _favColor : _notFavColor}
        />
      )}
    </>
  );

  return <ListItem content={<Content />} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(BookItem);
