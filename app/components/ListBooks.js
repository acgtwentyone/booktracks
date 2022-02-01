import {
  useDisclose,
  FormControl,
  View,
  useColorModeValue,
  useToast,
  Text,
  Button,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
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
import {NewBookSchema} from '../validation/Validations';
import {BookStatus} from '../realm/Schemas';
import {
  add,
  COLLECTION_NAMES,
  remove,
  serTimestamp,
  update,
} from '../firebase/FirebaseUtils';
import {useRef} from 'react';

const ListBooks = ({isFavourities = false, subtitle}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [books, setBooks] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const activityIndicatorBg = useColorModeValue('#FFF', '#000');
  const toast = useToast();
  const addEditAS = useRef();
  const [currentAS, setCurrentAS] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting, isValidating},
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      isbn: '',
    },
    resolver: yupResolver(NewBookSchema),
  });

  useEffect(() => {
    const subscriber = _loadBooks();
    return () => subscriber();
  }, []);

  const _loadBooks = () => {
    let subscriber = firestore().collection(COLLECTION_NAMES.books);
    if (isFavourities) {
      subscriber = subscriber.where('favourity', '==', true);
    }
    subscriber = subscriber.onSnapshot(querySnapshot => {
      const _books = [];
      querySnapshot.forEach(documentSnapshot => {
        _books.push(documentSnapshot);
      });
      setBooks(_books);
      setLoading(false);
    });

    return subscriber;
  };

  const _showToastMsg = msg => {
    toast.show({
      title: msg,
      placement: 'top',
    });
  };

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
          status: BookStatus.active,
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

  if (loading) {
    return (
      <View bg={activityIndicatorBg} flex={1}>
        <ActivityIndicator />
      </View>
    );
  }

  const _onRefresh = () => {
    _loadBooks();
  };

  const _openAddEditAS = () => {
    setCurrentAS('editAddAS');
    onOpen();
  };

  const _onDotPress = item => {
    setBookToDelete(item);
    setCurrentAS('deleteAddFavAS');
    onOpen();
  };

  const _onClose = () => {
    setEdit(false);
    setCurrentId(null);
    setBookToDelete(null);
    reset();
    onClose();
    setCurrentAS(null);
  };

  const _onDeletePress = () => {
    if (bookToDelete !== null) {
      const {
        _data: {title},
        id,
      } = bookToDelete;
      remove(COLLECTION_NAMES.books, id, _onSuccess(`Book ${title} deleted`));
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
      />
      <AppFab label="Book" onPress={_openAddEditAS} />
      {!isFavourities ? (
        currentAS !== null && currentAS === 'editAddAS' ? (
          <ActionSheet isOpen={isOpen} onClose={_onClose} reference={addEditAS}>
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
            {/* {isValidating && <Text>Validating fields</Text>}
            {isSubmitting && <Text>Adding book</Text>} */}
          </ActionSheet>
        ) : bookToDelete !== null ? (
          <ActionSheet isOpen={isOpen} onClose={_onClose}>
            <Text mt={4}>
              {bookToDelete._data !== null
                ? `Book ${bookToDelete._data.title} will be deleted. Do you want to procced ?`
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

export default ListBooks;
