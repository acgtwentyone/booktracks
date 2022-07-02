import React, {useEffect, useState} from 'react';
import {Menu, ScrollView, Text, VStack} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {AppBadge, AppMenu, BookItemContent, Screen} from '../components';
import {AppActivityIndicator, AppMenuOption} from '../components';
import {ROUTES_NAME} from '../Utils';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {getObjData} from '../data/AsyncStorageUtils';

const BookDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const {id} = route.params;

  const __onEditPress = () => {
    navigation.navigate(ROUTES_NAME.add_edit_book, {
      id: id,
      edit: true,
    });
  };

  const MenuOptions = () => (
    <AppMenu position="bottom left">
      <Menu.Item>
        <AppMenuOption
          icon="pencil"
          title="Edit"
          onPress={() => __onEditPress()}
        />
        <AppMenuOption icon="file-document-edit" title="Update last page" />
        <AppMenuOption icon="comment-plus" title="New Note" />
        <AppMenuOption icon="delete" title="Delete" />
      </Menu.Item>
    </AppMenu>
  );

  useEffect(() => {
    getObjData('user', e => {}).then(u => {
      firestore()
        .collection('users')
        .doc(u.uid)
        .collection(COLLECTION_NAMES.books)
        .doc(id)
        .onSnapshot(snapshot => {
          setItem(snapshot.data());
          setLoading(false);
          navigation.setOptions({
            headerRight: () => <MenuOptions />,
          });
        });
    });
    return () => {};
  }, []);

  const onStarPress = () => {
    console.log('onStarPress');
  };

  if (loading) {
    return <AppActivityIndicator m={0} />;
  }

  return (
    <Screen>
      <ScrollView p={4}>
        <VStack>
          <BookItemContent item={item} onStarPress={onStarPress} />
          <VStack mt={4}>
            {undefined !== item.year && item.year !== '' && (
              <AppBadge title={item.year}>year</AppBadge>
            )}
            {undefined !== item.isbn && item.isbn !== '' && (
              <AppBadge title={item.isbn}>ISBN</AppBadge>
            )}
            <AppBadge
              title={item.created_at.toDate().toString().substring(0, 10)}>
              registered
            </AppBadge>
            <Text mt={6}>{item.description}</Text>
          </VStack>
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default BookDetailScreen;
