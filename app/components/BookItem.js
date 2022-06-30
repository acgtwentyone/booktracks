import {Box, HStack, Text} from 'native-base';
import React from 'react';
import {BookItemOptions, ListItem} from '.';
import {limitStr} from '../Utils';

const BookItem = ({
  item,
  recent = false,
  onStarPress,
  onItemPress,
  isFavScreen = false,
  limit,
}) => {
  const {
    _data: {title, author, favourity, last_readed_page},
  } = item;

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
      {!recent && !isFavScreen && (
        <BookItemOptions
          favourity={favourity}
          onStarPress={onStarPress}
          last_readed_page={last_readed_page}
        />
      )}
    </HStack>
  );

  return (
    <ListItem content={<Content />} recent={recent} onItemPress={onItemPress} />
  );
};

export default React.memo(BookItem);
