import React from 'react';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {BookItemOptions, Screen} from '../components';
import {useNavigation, useRoute} from '@react-navigation/native';

const BookDetailScreen = () => {
  const route = useRoute();
  const {
    data: {
      author,
      created_at,
      description,
      favourity,
      isbn,
      last_readed_page,
      title,
      year,
    },
    id,
  } = route.params;

  console.log(description);

  const onStarPress = () => {
    console.log('onStarPress');
  };

  const RenderInfo = ({info, name}) => (
    <>
      {undefined !== info && info !== '' && (
        <HStack display="flex" alignItems="center">
          <Text>{name}</Text>
          <Text m={2}>{info}</Text>
        </HStack>
      )}
    </>
  );

  return (
    <Screen>
      <VStack p={4}>
        <HStack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          w="full">
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
          <BookItemOptions
            favourity={favourity}
            onStarPress={onStarPress}
            last_readed_page={last_readed_page}
          />
        </HStack>
        <Divider my={4} />
        <RenderInfo info={year} name="Year" />
        <RenderInfo info={isbn} name="ISBN" />
        <Text>{created_at.toDate().toString()}</Text>
        {undefined !== description && description !== '' && (
          <Text>{description}</Text>
        )}
      </VStack>
    </Screen>
  );
};

export default BookDetailScreen;
