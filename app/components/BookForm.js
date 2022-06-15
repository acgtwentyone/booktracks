import React from 'react';
import {Controller} from 'react-hook-form';
import {FormControl, Stack, Text} from 'native-base';
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
import {ErrorMessage} from './';

const BookForm = ({
  control,
  currentId,
  edit,
  handleSubmit,
  onSuccess,
  errors,
}) => {
  const {_alertError} = useAlertError();

  const onSubmit = data => {
    const {title, author, year, isbn} = data;
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
              year: Number(year),
              isbn: isbn,
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
              year: Number(year),
              isbn: isbn,
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
