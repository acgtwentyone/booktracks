import React from 'react';
import {Controller} from 'react-hook-form';
import {FormControl, Stack, Text, useColorModeValue} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import {AppInput, SubmitButton} from './';
import {getObjData} from '../data/AsyncStorageUtils';
import {useAlertError} from '../hooks';
import {uuid} from '../Utils';
import {
  COLLECTION_NAMES,
  serTimestamp,
  ItemStatus,
} from '../firebase/FirebaseUtils';

const BookForm = ({
  control,
  currentId,
  edit,
  handleSubmit,
  onSuccess,
  errors,
}) => {
  const {_alertError} = useAlertError();
  const errorColor = useColorModeValue('red.500', 'white');

  const onSubmit = data => {
    const {author, isbn, last_readed_page, note, title, year} = data;
    const lastReaded =
      undefined !== last_readed_page && last_readed_page !== ''
        ? Number(last_readed_page)
        : '';
    const y = undefined !== year && year !== '' ? Number(year) : '';
    getObjData('user', e => _alertError()).then(u => {
      edit
        ? firestore()
            .collection(COLLECTION_NAMES.users)
            .doc(u.uid)
            .collection(COLLECTION_NAMES.books)
            .doc(currentId)
            .update({
              title: title,
              author: author,
              year: y,
              isbn: isbn,
              last_readed_page: lastReaded,
              note: note,
            })
            .then(() => {
              onSuccess(`Book ${title} updated`);
            })
            .catch(error => _alertError())
        : firestore()
            .collection(COLLECTION_NAMES.users)
            .doc(u.uid)
            .collection(COLLECTION_NAMES.books)
            .add({
              id: uuid(),
              title: title,
              author: author,
              year: y,
              isbn: isbn,
              last_readed_page: lastReaded,
              note: note,
              created_at: serTimestamp,
              updated_at: serTimestamp,
              status: ItemStatus.active,
              favourity: false,
            })
            .then(() => {
              onSuccess(`Book ${title} added`);
            })
            .catch(error => _alertError());
    });
  };

  const ErrorMessage = ({name}) => (
    <>
      {errors && errors[name] && (
        <Text mx={4} my={2} color={errorColor}>
          {errors[name]?.message}
        </Text>
      )}
    </>
  );

  return (
    <FormControl>
      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
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
        <ErrorMessage name="title" />
      </Stack>

      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
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
        <ErrorMessage name="author" />
      </Stack>

      <Stack my={2}>
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
        <ErrorMessage name="year" />
      </Stack>

      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
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
        <ErrorMessage name="isbn" />
      </Stack>
      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              placeholder="Last readed page"
              props={{keyboardType: 'numeric'}}
              control={control}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="last_readed_page"
        />
        <ErrorMessage name="last_readed_page" />
      </Stack>
      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              placeholder="Note"
              control={control}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="note"
        />
        <ErrorMessage name="note" />
      </Stack>
      <SubmitButton
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={edit && currentId ? 'Update Book' : 'Add Book'}
      />
    </FormControl>
  );
};

export default React.memo(BookForm);
