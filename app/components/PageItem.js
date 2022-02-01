import {Box, HStack, Icon, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONT_SIZE} from '../Utils';

const ListItem = ({
  style,
  props,
  item,
  recent = false,
  onEditPress,
  onDotPress,
}) => {
  const {
    _data: {page, book},
  } = item;

  const Content = () => (
    <>
      <Box>
        <Text fontSize={FONT_SIZE.font_18}>{page}</Text>
        <Text
          mt={2}
          fontSize={FONT_SIZE.font_15}
          _dark={{
            color: 'white',
          }}
          _light={{
            color: 'gray.600',
          }}>
          {book}
        </Text>
      </Box>
      {!recent && (
        <HStack justifyContent="flex-end" justifyItems="center">
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
      )}
    </>
  );
  return <ListItem content={<Content />} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ListItem);
