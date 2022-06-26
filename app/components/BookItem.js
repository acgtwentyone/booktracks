import {Box, HStack, Icon, Text, useColorModeValue, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
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
    _data: {title, author, favourity, last_readed_page},
  } = item;

  const __renderOptions = () => (
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
      {!recent && !isFavScreen && __renderOptions()}
    </HStack>
  );

  return (
    <ListItem content={<Content />} recent={recent} onItemPress={onItemPress} />
  );
};

const styles = StyleSheet.create({
  favIcon: {
    marginTop: 16,
  },
});

export default React.memo(BookItem);
