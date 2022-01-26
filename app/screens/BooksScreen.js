import {useDisclose, FormControl} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

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
import {SCHEMA_NAMES} from '../realm/RealmUtils';
import {BookStatus} from '../realm/Schemas';

const {book} = SCHEMA_NAMES;

// const books = require('../dummy/books.json');

const BooksScreen = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [books, setBooks] = useState([]);
  // const realm = __initRealm();

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

  const __registerBook = async data => {
    try {
      // const _realm = await Realm.open({
      //   schema: [BookSchema],
      //   sync: {
      //     user: realmApp.currentUser,
      //     partitionValue: REALM_PARTITION_NAME,
      //   },
      // });
      // _realm.write(() => {
      //   _realm.create(book, data);
      // });
      // const dogs = _realm.objects(book);
      // console.log(dogs);
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  const onSubmit = data => {
    const {title, author, year, isbn} = data;
    const _data = {
      // _id: new BSON.ObjectID(),
      title: title,
      author: author,
      year: Number(year),
      isbn: isbn,
      created_at: new Date(),
      updated_at: new Date(),
      status: BookStatus.active,
      favourity: false,
    };
    __registerBook(_data);
  };

  const __testFirestore = () => {
    console.log('test firestore');
  };

  return (
    <Screen style={styles.container}>
      <VList
        data={books}
        renderItem={({item}) => (
          <BookItem name={item.title} author={item.author} />
        )}
        ListHeaderComponent={<ListTitle title="My Books" />}
      />
      <AppFab label="Book" onPress={__testFirestore} />
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
