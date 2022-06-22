import {Box, HStack, Icon, Text, useColorModeValue} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '.';
import {limitStr} from '../Utils';
import {AppTouchableOpacity} from './';

const BookItem = ({
  item,
  recent = false,
  onStarPress,
  onItemPress,
  isFavScreen = false,
  limit,
}) => {
  const _favColor = useColorModeValue('yellow.500', 'yellow.500');
  const _notFavColor = useColorModeValue('black', 'white');
  const {
    _data: {title, author, favourity},
  } = item;

  const __renderStarBtn = () => (
    <AppTouchableOpacity onPress={onStarPress}>
      <Icon
        as={MaterialCommunityIcons}
        name="star-outline"
        size="xs"
        m={2}
        color={favourity ? _favColor : _notFavColor}
      />
    </AppTouchableOpacity>
  );

  const Content = () => (
    <HStack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      w="full">
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {limit ? limitStr(title, limit) : title}
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
          {limit ? limitStr(author, limit) : author}
        </Text>
      </Box>
      {!recent && !isFavScreen ? (
        <HStack justifyContent="flex-end" justifyItems="center">
          {__renderStarBtn()}
        </HStack>
      ) : !recent ? (
        __renderStarBtn()
      ) : (
        <></>
      )}
    </HStack>
  );

  return (
    <ListItem content={<Content />} recent={recent} onItemPress={onItemPress} />
  );
};

export default React.memo(BookItem);
