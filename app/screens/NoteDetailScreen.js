import React, {useEffect, useState} from 'react';
import {Button, Menu, ScrollView, Text, useDisclose, VStack} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {useAlertError, useShowMessage} from '../hooks';

import {
  AppBadge,
  ActionSheet,
  AppMenu,
  Screen,
  NoteItemContent,
} from '../components';
import {AppActivityIndicator, AppMenuOption} from '../components';
import {limitStr, ROUTES_NAME} from '../Utils';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {getObjData} from '../data/AsyncStorageUtils';

const ACTION_SHEET_TYPES = {
  delete: 'DELETE',
};

const NoteDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionSheetType, setActionSheetType] = useState(null);

  const {_alertError} = useAlertError();
  const {_showToastMsg} = useShowMessage();

  const {id, book_id} = route.params;

  const __onEditPress = () => {
    navigation.navigate(ROUTES_NAME.add_edit_book, {
      id: id,
      edit: true,
      book_id: book_id,
    });
  };

  const __onDeletePress = () => {
    setActionSheetType(ACTION_SHEET_TYPES.delete);
    onOpen();
  };

  const MenuOptions = () => (
    <AppMenu position="bottom left">
      <Menu.Item>
        <AppMenuOption
          icon="pencil"
          title="Edit"
          onPress={() => __onEditPress()}
        />
        <AppMenuOption
          icon="delete"
          title="Delete"
          onPress={() => __onDeletePress()}
        />
      </Menu.Item>
    </AppMenu>
  );

  useEffect(() => {
    getObjData('user', e => {}).then(u => {
      firestore()
        .collection('users')
        .doc(u.uid)
        .collection(COLLECTION_NAMES.books)
        .doc(book_id)
        .collection(COLLECTION_NAMES.notes)
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

  const _onDeleteConfirmPress = () => {
    getObjData('user', e => _alertError())
      .then(u => {
        firestore()
          .collection(COLLECTION_NAMES.users)
          .doc(u.uid)
          .collection(COLLECTION_NAMES.books)
          .doc(book_id)
          .collection(COLLECTION_NAMES.notes)
          .doc(id)
          .delete()
          .then(() => {
            _showToastMsg(`Book ${limitStr(item.note)} deleted`);
            navigation.navigate(ROUTES_NAME.notes);
          })
          .catch(error => _alertError());
      })
      .catch(e => _alertError());
  };

  const DeleteConfirmation = () => (
    <VStack>
      <Text>
        Note that this record can not be accessed again. Do you want Procced ?
      </Text>
      <Button
        mt={4}
        onPress={() => _onDeleteConfirmPress()}
        _dark={{background: 'red.500'}}
        _light={{background: 'red.100'}}>
        Delete
      </Button>
    </VStack>
  );

  if (loading) {
    return <AppActivityIndicator m={0} />;
  }

  return (
    <Screen>
      <ScrollView p={4}>
        <VStack>
          <NoteItemContent item={item} isDetail={true} />
          <VStack>
            <AppBadge
              mt="6"
              title={item.created_at.toDate().toString().substring(0, 10)}>
              registered
            </AppBadge>
          </VStack>
        </VStack>
      </ScrollView>
      {ACTION_SHEET_TYPES.delete === actionSheetType && item !== null && (
        <ActionSheet isOpen={isOpen} onClose={onClose}>
          <DeleteConfirmation />
        </ActionSheet>
      )}
    </Screen>
  );
};

export default NoteDetailScreen;
