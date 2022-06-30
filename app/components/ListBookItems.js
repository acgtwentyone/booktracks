import {useDisclose, Button, Text, VStack} from 'native-base';
import React, {useState} from 'react';
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
import {useAlertError, useLoadBooks, useOnStarPress, useShowMessage} from '../hooks';
import {getObjData} from '../data/AsyncStorageUtils';
import {limitStr, ROUTES_NAME, SCREEN_WIDTH} from '../Utils';
import {UpdateLastReadedPage} from './';
import {useNavigation} from '@react-navigation/native';

const ACTION_SHEET_TYPES = {
  add_edit: 'ADD_EDIT',
  item_pressed: 'ITEM_PRESSED',
  confirm_remove_item: 'CONFIRM_REMOVE_ITEM',
};

const ListBookItems = ({isFavourities = false, subtitle}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [currentId, setCurrentId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [actionSheetType, setActionSheetType] = useState(null);
  const [itemPressed, setItemPressed] = useState(null);
  const {books, loading, refreshing, _onRefresh} = useLoadBooks(isFavourities);
  const {_alertError} = useAlertError();
  const {_showToastMsg} = useShowMessage();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      isbn: '',
      last_readed_page: '',
      description: '',
    },
    resolver: yupResolver(BookSchema),
  });

  const _onSuccess = msg => {
    _showToastMsg(msg);
    _onClose();
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
            `Book "${limitStr(title)}" ${
              favourity ? 'removed from' : 'added to'
            } favourity`,
          );
        })
        .catch(error => _alertError());
    });
  };

  const _onFabPress = () => {
    navigation.navigate(ROUTES_NAME.add_edit_book);
  };

  const _onItemPress = item => {
    navigation.navigate(ROUTES_NAME.book_detail, {
      data: item._data,
      id: item.id,
    });
  };

  const _onClose = () => {
    onClose();
  };

  const _onDeletePress = () => {
    console.log('on delete press');
  };

  const _onDeleteConfirmPress = () => {
    const {
      _data: {title},
      id,
    } = itemPressed;
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
  };

  const _onEditPress = () => {
    if (undefined !== itemPressed) {
      const {
        _data: {author, isbn, last_readed_page, description, title, year},
        id,
      } = itemPressed;
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
        setValue('last_readed_page', last_readed_page.toString());
        setValue('description', description.toString());
        setCurrentId(id);
        setEdit(true);
        setActionSheetType(ACTION_SHEET_TYPES.add_edit);
        onOpen();
      }
    }
  };

  const DeleteConfirmation = () => (
    <VStack>
      <Text>Note that this record can not be accessed again. Procced ?</Text>
      <Button
        mt={4}
        onPress={() => _onDeleteConfirmPress()}
        _dark={{background: 'red.500'}}
        _light={{background: 'red.100'}}>
        Delete
      </Button>
    </VStack>
  );

  return (
    <Screen style={styles.container}>
      <VList
        onRefresh={_onRefresh}
        refreshing={refreshing}
        data={books}
        renderItem={({item}) => (
          <BookItem
            item={item}
            onStarPress={() => _onStarPress(item)}
            onItemPress={() => _onItemPress(item)}
            isFavScreen={isFavourities}
            limit={SCREEN_WIDTH / 16}
          />
        )}
        ListHeaderComponent={<ListTitle title={subtitle} />}
        loading={loading}
      />
      {!isFavourities && <AppFab onPress={_onFabPress} />}
      {!isFavourities && actionSheetType === ACTION_SHEET_TYPES.add_edit && (
        <ActionSheet isOpen={isOpen} onClose={_onClose}>
          <BookForm
            control={control}
            currentId={currentId}
            edit={edit}
            handleSubmit={handleSubmit}
            onSuccess={_onSuccess}
            errors={errors}
          />
        </ActionSheet>
      )}
      {/* {!isFavourities && actionSheetType === ACTION_SHEET_TYPES.item_pressed && (
        <ActionSheet isOpen={isOpen} onClose={_onClose}>
          <UpdateLastReadedPage item={itemPressed} />
          <DeleteConfirmation />
        </ActionSheet>
      )} */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListBookItems;
