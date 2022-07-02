import React, {useEffect} from 'react';
import {Menu, Text, VStack} from 'native-base';
import {AppBadge, AppMenu, BookItemContent, Screen} from '../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppMenuOption} from '../components';

const BookDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const MenuOptions = () => (
    <AppMenu position="bottom left">
      <Menu.Item>
        <AppMenuOption icon="pencil" title="Edit" />
        <AppMenuOption icon="pencil" title="Update last page" />
        <AppMenuOption icon="pencil" title="New Note" />
        <AppMenuOption icon="pencil" title="Delete" />
      </Menu.Item>
    </AppMenu>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <MenuOptions />,
    });
    return () => {};
  }, []);

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
