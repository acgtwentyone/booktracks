import {useDisclose, FormControl, View, useColorModeValue} from 'native-base';
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
} from '../components';
import {NewBookSchema} from '../validation/Validations';
import {BookStatus} from '../realm/Schemas';
import {add, COLLECTION_NAMES, serTimestamp} from '../firebase/FirebaseUtils';

const BooksScreen = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const activityIndicatorBg = useColorModeValue('#FFF', '#000');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      isbn: '',
    },
    // resolver: yupResolver(NewBookSchema),
  });

  const _loadBooks = () => {
    const subscriber = firestore()
      .collection(COLLECTION_NAMES.books)
      .onSnapshot(querySnapshot => {
        const _books = [];
        querySnapshot.forEach(documentSnapshot => {
          _books.push(documentSnapshot.data());
        });
        setBooks(_books);
        setLoading(false);
      });

    return subscriber;
  };

  useEffect(() => {
    const subscriber = _loadBooks();
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const onSubmit = data => {
    const {title, author, year, isbn} = data;
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
    );
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

  return (
    <Screen style={styles.container}>
      <VList
        onRefresh={_onRefresh}
        refreshing={refreshing}
        data={books}
        renderItem={({item}) => (
          <BookItem name={item.title} author={item.author} />
        )}
        ListHeaderComponent={<ListTitle title="My Books" />}
      />
      <AppFab label="Book" onPress={onOpen} />
      <ActionSheet isOpen={isOpen} onClose={onClose}>
        <FormControl>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppInput
                errorMessage="Invalid title"
                helpertext="Title must be at least 4 characters"
                placeholder="Book title"
                props={{mt: 8}}
                control={control}
                rules={{required: true}}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="title"
          />
          {/* {errors.title && <Text>This is required.</Text>} */}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppInput
                errorMessage="Invalid author name"
                helpertext="Author name must be at least 4 characters"
                placeholder="Author"
                props={{mt: 8}}
                control={control}
                rules={{required: true}}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="author"
          />
          {/* {errors.author && <Text>This is required.</Text>} */}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppInput
                placeholder="Year"
                props={{mt: 8}}
                control={control}
                rules={{required: true}}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="year"
          />
          {/* {errors.year && <Text>This is required.</Text>} */}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppInput
                errorMessage="Invalid ISBN"
                helpertext="ISBN must be at least 10 characters"
                placeholder="ISBN"
                props={{mt: 8}}
                control={control}
                rules={{required: true}}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="isbn"
          />
          {/* {errors.isbn && <Text>This is required.</Text>} */}
          <SubmitButton
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            title="Register book"
          />
        </FormControl>
      </ActionSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BooksScreen;
