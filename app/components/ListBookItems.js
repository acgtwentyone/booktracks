import {useDisclose, Text, Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

import {
  ActionSheet,
  AppFab,
  BookForm,
  BookItem,
  ListTitle,
  Screen,
  VList,
} from '.';
import {BookSchema} from '../validation/Validations';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {useAlertError, useLoadBooks, useShowMessage} from '../hooks';
import {getObjData} from '../data/AsyncStorageUtils';

const ListBookItems = ({isFavourities = false, subtitle}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [currentId, setCurrentId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [currentAS, setCurrentAS] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const {books, loading, refreshing, _loadBooks, _onRefresh} =
    useLoadBooks(isFavourities);

  const {_alertError} = useAlertError();
  const {_showToastMsg} = useShowMessage();

  const {control, handleSubmit, reset, setValue} = useForm({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      isbn: '',
    },
    resolver: yupResolver(BookSchema),
  });

  useEffect(() => {
    _loadBooks();
    return firestore;
  }, []);

  const _onSuccess = msg => {
    _onClose();
    _showToastMsg(msg);
  };

  const _onStarPress = ({_data: {title, favourity}, id}) => {
    getObjData('user', e => _alertError()).then(u => {
      firestore()
        .collection('users')
        .doc(u.uid)
        .collection(COLLECTION_NAMES.books)
        .doc(id)
        .update({
          favourity: !favourity,
        })
        .then(() => {
          _onSuccess(
            `Book ${title} ${
              favourity ? 'removed from' : 'added to'
            } favourity`,
          );
        })
        .catch(error => _alertError());
    });
  };

  const _editBook = item => {
    if (undefined !== item) {
      const {
        _data: {author, isbn, title, year},
        id,
      } = item;
      if (
        undefined !== title &&
        undefined !== isbn &&
        undefined !== author &&
        undefined !== year
      ) {
        setValue('author', author);
        setValue('isbn', isbn);
        setValue('title', title);
        setValue('year', year.toString());
        setCurrentId(id);
        setEdit(true);
        setCurrentAS('editAddAS');
        onOpen();
      }
    }
  };

  const _openAddEditAS = () => {
    setCurrentAS('editAddAS');
    onOpen();
  };

  const _onDotPress = item => {
    setItemToDelete(item);
    setCurrentAS('deleteAddFavAS');
    onOpen();
  };

  const _onClose = () => {
    onClose();
    setEdit(false);
    setCurrentId(null);
    setItemToDelete(null);
    reset();
    setCurrentAS(null);
  };

  const _onDeletePress = () => {
    if (itemToDelete !== null) {
      const {
        _data: {title},
        id,
      } = itemToDelete;
      getObjData('user', e => _alertError())
        .then(u => {
          firestore()
            .collection(COLLECTION_NAMES.users)
            .doc(u.uid)
            .collection(COLLECTION_NAMES.books)
            .doc(id)
            .delete()
            .then(() => _onSuccess(`Book ${title} deleted`))
            .catch(error => _alertError());
        })
        .catch(e => _alertError());
    }
  };

  return (
    <Screen style={styles.container}>
      <VList
        onRefresh={_onRefresh}
        refreshing={refreshing}
        data={books}
        renderItem={({item}) => (
          <BookItem
            item={item}
            onEditPress={() => _editBook(item)}
            onStarPress={() => _onStarPress(item)}
            onDotPress={() => _onDotPress(item)}
            isFavScreen={isFavourities}
          />
        )}
        ListHeaderComponent={<ListTitle title={subtitle} />}
        loading={loading}
      />
      {!isFavourities && <AppFab onPress={_openAddEditAS} />}
      {!isFavourities ? (
        currentAS !== null && currentAS === 'editAddAS' ? (
          <ActionSheet isOpen={isOpen} onClose={_onClose}>
            <BookForm
              control={control}
              currentId={currentId}
              edit={edit}
              handleSubmit={handleSubmit}
              onSuccess={_onSuccess}
            />
          </ActionSheet>
        ) : itemToDelete !== null ? (
          <ActionSheet isOpen={isOpen} onClose={_onClose}>
            <Text mt={4}>
              {itemToDelete._data !== null
                ? `Book ${itemToDelete._data.title} will be deleted. Do you want to procced ?`
                : ' '}
            </Text>
            <Button
              mt={4}
              mb={4}
              onPress={_onDeletePress}
              _dark={{background: 'red.500'}}
              _light={{background: 'red.100'}}>
              YES
            </Button>
          </ActionSheet>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListBookItems;
