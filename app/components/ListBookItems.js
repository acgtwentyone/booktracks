import {useDisclose, Button, Text, VStack, HStack, Icon} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
import {SCREEN_WIDTH} from '../Utils';
import AppTouchableOpacity from './AppTouchableOpacity';

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
            `Book ${title} ${
              favourity ? 'removed from' : 'added to'
            } favourity`,
          );
        })
        .catch(error => _alertError());
    });
  };

  const _onFabPress = () => {
    setActionSheetType(ACTION_SHEET_TYPES.add_edit);
    onOpen();
  };

  const _onItemPress = item => {
    setItemPressed(item);
    setActionSheetType(ACTION_SHEET_TYPES.item_pressed);
    onOpen();
  };

  const _onClose = () => {
    setEdit(false);
    setCurrentId(null);
    reset();
    setActionSheetType(null);
    onClose();
  };

  const _onDeletePress = () => {
    setActionSheetType(ACTION_SHEET_TYPES.confirm_remove_item);
    onOpen();
  };

  const _onConfirmDeletePress = () => {
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

  const ItemPressedOption = ({title, right}) => (
    <HStack
      m={2}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      w="full">
      <Text>{title}</Text>
      {right}
    </HStack>
  );

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

  const EditOption = () => (
    <ItemPressedOption
      title="Edit this book"
      right={
        <AppTouchableOpacity onPress={() => _onEditPress()}>
          <Icon as={MaterialCommunityIcons} name="pencil" size="xs" m={2} />
        </AppTouchableOpacity>
      }
    />
  );
  const DeleteOption = () => (
    <ItemPressedOption
      title="Remove this Book ?"
      right={
        <Button
          size="sm"
          onPress={() => _onDeletePress()}
          _dark={{background: 'red.500'}}
          _light={{background: 'red.100'}}>
          YES
        </Button>
      }
    />
  );

  const DeleteConfirmation = () => (
    <VStack>
      <Text>
        Note that this operation can not be undone. And this record can not be
        accessed again. Procced ?
      </Text>
      <Button
        mt={4}
        onPress={() => _onConfirmDeletePress()}
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
      {!isFavourities && actionSheetType === ACTION_SHEET_TYPES.item_pressed && (
        <ActionSheet isOpen={isOpen} onClose={_onClose}>
          <EditOption />
          <DeleteOption />
        </ActionSheet>
      )}
      {!isFavourities &&
        actionSheetType === ACTION_SHEET_TYPES.confirm_remove_item && (
          <ActionSheet isOpen={isOpen} onClose={_onClose}>
            <DeleteConfirmation />
          </ActionSheet>
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
