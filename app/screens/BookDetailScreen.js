import React from 'react';
import {Badge, HStack, Text, VStack} from 'native-base';
import {AppBadge, BookItemContent, Screen} from '../components';
import {useRoute} from '@react-navigation/native';

const BookDetailScreen = () => {
  const route = useRoute();
  const {
    data: {created_at, description, isbn, year},
    id,
  } = route.params;

  const onStarPress = () => {
    console.log('onStarPress');
  };

  return (
    <Screen>
      <VStack p={4}>
        <BookItemContent item={route.params.data} onStarPress={onStarPress} />
        <VStack mt={4}>
          {undefined !== year && year !== '' && (
            <AppBadge title={year}>year</AppBadge>
          )}
          {undefined !== isbn && isbn !== '' && (
            <AppBadge title={isbn}>ISBN</AppBadge>
          )}
          <AppBadge title={created_at.toDate().toString().substring(0, 10)}>
            registered
          </AppBadge>
          <Text mt={6}>{description}</Text>
        </VStack>
      </VStack>
    </Screen>
  );
};

export default BookDetailScreen;
