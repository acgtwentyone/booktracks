import {useDisclose, FormControl, Text, Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {uuid} from '../Utils';

import {
  ActionSheet,
  AppFab,
  AppInput,
  BookItem,
  ListTitle,
  Screen,
  SubmitButton,
  VList,
} from '.';
import {BookSchema} from '../validation/Validations';
import {
  add,
  COLLECTION_NAMES,
  remove,
  serTimestamp,
  update,
  ItemStatus,
} from '../firebase/FirebaseUtils';
import {useRef} from 'react';
import {useLoadBooks} from '../hooks';
import useShowMessage from '../hooks/useShowMessage';

const ListBookItems = ({isFavourities = false, subtitle}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [currentId, setCurrentId] = useState(null);
  const [edit, setEdit] = useState(false);
  const addEditAS = useRef();
  const [currentAS, setCurrentAS] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const {books, loading, refreshing, _loadBooks, _onRefresh} =
    useLoadBooks(isFavourities);

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

  useEffect(() => _loadBooks(), []);

  const _onSuccess = msg => {
    _onClose();
    _showToastMsg(msg);
  };

  const onSubmit = data => {
    const {title, author, year, isbn} = data;
    if (edit) {
      update(
        {
          title: title,
          author: author,
          year: Number(year),
          isbn: isbn,
        },
        COLLECTION_NAMES.books,
        currentId,
        _onSuccess(`Book ${title} updated`),
      );
    } else {
      add(
        {
          id: uuid(),
          title: title,
          author: author,
          year: Number(year),
          isbn: isbn,
          created_at: serTimestamp,
          updated_at: serTimestamp,
          status: ItemStatus.active,
          favourity: false,
        },
        COLLECTION_NAMES.books,
        _onSuccess(`Book ${title} added`),
      );
    }
  };

  const _onStarPress = ({_data: {title, favourity}, id}) => {
    update(
      {
        favourity: !favourity,
      },
      COLLECTION_NAMES.books,
      id,
      _onSuccess(
        `Book ${title} ${favourity ? 'removed from' : 'added to'} favourity`,
      ),
    );
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
      remove(COLLECTION_NAMES.books, id, _onSuccess(`Book ${title} deleted`));
    }
  };

  const RenderForm = () => {
    return (
      <FormControl>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              errorMessage="Invalid title"
              // helpertext="Title must be at least 4 characters"
              placeholder="Book title"
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="title"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              errorMessage="Invalid author name"
              // helpertext="Author name must be at least 4 characters"
              placeholder="Author"
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="author"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              placeholder="Year"
              props={{keyboardType: 'numeric'}}
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="year"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              errorMessage="Invalid ISBN"
              // helpertext="ISBN must be at least 10 characters"
              placeholder="ISBN"
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="isbn"
        />
        <SubmitButton
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          title={edit && currentId ? 'Update Book' : 'Add Book'}
        />
      </FormControl>
    );
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
          <ActionSheet isOpen={isOpen} onClose={_onClose} reference={addEditAS}>
            <RenderForm />
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
    // backgroundColor: 'red',
    // margin: 2,
  },
});

export default ListBookItems;
