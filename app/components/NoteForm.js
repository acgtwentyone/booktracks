import React from 'react';
import {Controller} from 'react-hook-form';
import {
  FormControl,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import {AppInput, SubmitButton} from '.';
import {getObjData} from '../data/AsyncStorageUtils';
import {uuid} from '../Utils';
import {
  COLLECTION_NAMES,
  serTimestamp,
  ItemStatus,
} from '../firebase/FirebaseUtils';

const NoteForm = ({
  control,
  currentId,
  edit,
  handleSubmit,
  onSuccess,
  errors,
  selectedBook,
  alertError,
}) => {
  const errorColor = useColorModeValue('red.500', 'white');
  const toast = useToast();

  const _showToastMsg = msg => {
    toast.show({
      title: msg,
      placement: 'top',
    });
  };

  const onSubmit = data => {
    const {note} = data;
    getObjData('user', e => alertError())
      .then(u => {
        if (edit) {
          firestore()
            .collection('users')
            .doc(u.uid)
            .collection(COLLECTION_NAMES.books)
            .doc(selectedBook.id)
            .collection(COLLECTION_NAMES.notes)
            .update({
              note: note,
            })
            .then(() => onSuccess(`note ${note} updated`))
            .catch(error => alertError());
        } else {
          if (selectedBook !== null) {
            firestore()
              .collection('users')
              .doc(u.uid)
              .collection(COLLECTION_NAMES.books)
              .doc(selectedBook.id)
              .collection(COLLECTION_NAMES.notes)
              .add({
                id: uuid(),
                note: note,
                created_at: serTimestamp,
                updated_at: serTimestamp,
                book_id: selectedBook.id,
                status: ItemStatus.active,
              })
              .then(() => onSuccess(`note ${note} added`))
              .catch(error => alertError());
          } else {
            _showToastMsg('Please select a book first');
          }
        }
      })
      .catch(error => alertError());
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
      <Stack>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              placeholder="note"
              props={{keyboardType: 'numeric'}}
              control={control}
              rules={{required: true}}
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
        title={edit && currentId ? 'Update note' : 'Add note'}
      />
    </FormControl>
  );
};

export default React.memo(NoteForm);
