import {Box, HStack, Icon, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '.';

const NoteItem = ({
  style,
  props,
  item,
  recent = false,
  onEditPress,
  onDotPress,
}) => {
  const {
    _data: {note},
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
        <Text fontSize="lg" fontWeight="bold">
          {note}
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

export default React.memo(NoteItem);
