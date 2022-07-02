import {
  Badge,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppBadge, AppTouchableOpacity} from '.';
import {limitStr} from '../Utils';

const BookItemContent = ({onStarPress, item, recent = false}) => {
  const _favColor = useColorModeValue('yellow.500', 'yellow.500');
  const _notFavColor = useColorModeValue('black', 'white');

  const {title, last_readed_page, author, created_at, favourity} = item;

  return (
    <HStack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      w="full">
      <VStack>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <AppBadge title="Last page">{last_readed_page}</AppBadge>
      </VStack>
      {undefined !== recent && !recent && (
        <VStack
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-end">
          <AppTouchableOpacity onPress={onStarPress}>
            <Icon
              as={MaterialCommunityIcons}
              name="star-outline"
              size="xs"
              color={favourity ? _favColor : _notFavColor}
            />
          </AppTouchableOpacity>
          <AppBadge title={author}>author</AppBadge>
        </VStack>
      )}
    </HStack>
  );
};

export default React.memo(BookItemContent);
