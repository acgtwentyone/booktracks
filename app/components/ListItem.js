import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONT_SIZE, SCREEN_WIDTH} from '../Utils';

const ListItem = ({
  style,
  props,
  title,
  subtitle,
  favourity,
  showFavIcon = true,
  showEdit = true,
  recent = false,
  onEditPress,
  onStarPress,
  onDotPress,
}) => {
  const _favColor = useColorModeValue('yellow.500', 'yellow.500');
  const _notFavColor = useColorModeValue('black', 'white');

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
          {subtitle}
        </Text>
      </Box>
      {!recent && (
        <HStack justifyContent="flex-end" justifyItems="center">
          {showFavIcon && (
            <Icon
              as={MaterialCommunityIcons}
              name="star-outline"
              size="xs"
              m={2}
              onPress={onStarPress}
              color={favourity ? _favColor : _notFavColor}
            />
          )}
          {showEdit && (
            <Icon
              as={MaterialCommunityIcons}
              name="pencil"
              size="xs"
              m={2}
              onPress={onEditPress}
            />
          )}
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
  return (
    <>
      {recent ? (
        <Box
          mx={4}
          _text={{
            color: 'coolGray.800',
          }}>
          <Center
            w={SCREEN_WIDTH / 3}
            h={SCREEN_WIDTH / 3}
            _dark={{
              borderColor: 'coolGray.600',
              backgroundColor: 'gray.700',
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}
            p={4}>
            <Content />
          </Center>
        </Box>
      ) : (
        <Box
          p={4}
          mb={8}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}
          style={[styles.container, {...style}]}
          {...props}
          mx={4}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Content />
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ListItem);
