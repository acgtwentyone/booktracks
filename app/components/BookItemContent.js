import {
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useDisclose,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AppBadge,
  ActionSheet,
  AppTouchableOpacity,
  UpdateLastReadedPage,
} from '.';
import {limitStr} from '../Utils';

const ACTION_SHEET_TYPES = {
  update_last_page: 'UPDATE_LAST_PAGE',
};

const BookItemContent = ({
  onStarPress,
  item,
  isDetail = false,
  isFavScreen = false,
  itemId,
}) => {
  const _favColor = useColorModeValue('yellow.500', 'yellow.500');
  const _notFavColor = useColorModeValue('black', 'white');
  const [actionSheetType, setActionSheetType] = useState(null);
  const {isOpen, onOpen, onClose} = useDisclose();

  const {title, last_readed_page, author, favourity} = item;

  const __onEditLastPagePress = () => {
    setActionSheetType(ACTION_SHEET_TYPES.update_last_page);
    onOpen();
  };

  return (
    <HStack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      w="full">
      <VStack>
        <Text fontSize="lg" fontWeight="bold">
          {!isDetail ? limitStr(title) : title}
        </Text>
        <HStack mt="6" alignItems="center">
          <AppBadge title="Last page">{last_readed_page}</AppBadge>
          {!isDetail && !isFavScreen && (
            <AppTouchableOpacity onPress={() => __onEditLastPagePress()}>
              <Icon
                as={MaterialCommunityIcons}
                size="sm"
                name="file-document-edit"
                ml={2}
              />
            </AppTouchableOpacity>
          )}
        </HStack>
      </VStack>
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
        {!isDetail && (
          <Text mt="6" fontSize="md">
            {limitStr(author)}
          </Text>
        )}
        {ACTION_SHEET_TYPES.update_last_page === actionSheetType &&
          item !== null &&
          !isDetail &&
          !isFavScreen && (
            <ActionSheet isOpen={isOpen} onClose={onClose}>
              <UpdateLastReadedPage item={item} id={itemId} onClose={onClose} />
            </ActionSheet>
          )}
      </VStack>
    </HStack>
  );
};

export default React.memo(BookItemContent);
