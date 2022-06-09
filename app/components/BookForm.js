import React from 'react';
import {Controller} from 'react-hook-form';
import {FormControl} from 'native-base';
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

const BookForm = ({control, currentId, edit, handleSubmit, onSuccess}) => {
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

export default React.memo(BookForm);
