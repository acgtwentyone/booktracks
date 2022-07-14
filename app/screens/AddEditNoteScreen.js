import React, {useEffect, useState} from 'react';
import {ScrollView} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

import {
  AppActivityIndicator,
  NoteForm,
  Screen,
  SubmitButton,
} from '../components';
import {useAlertError, useShowMessage} from '../hooks';
import {NoteSchema} from '../validation/Validations';
import {limitStr, ROUTES_NAME, uuid} from '../Utils';
import {getObjData} from '../data/AsyncStorageUtils';
import {
  COLLECTION_NAMES,
  serTimestamp,
  ItemStatus,
} from '../firebase/FirebaseUtils';

const AddEditNoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {_showToastMsg} = useShowMessage();
  const {_alertError} = useAlertError();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      note: '',
      page: '',
    },
    resolver: yupResolver(NoteSchema),
  });

  const {edit, id, book_id} = route.params;

  const __showSaveButton = () => {
    navigation.setOptions({
      headerRight: () => <HeaderRight />,
    });
  };

  const __getNote = () => {
    if (undefined !== edit && edit) {
      setLoading(true);
      getObjData('user', e => {}).then(u => {
        firestore()
          .collection('users')
          .doc(u.uid)
          .collection(COLLECTION_NAMES.books)
          .doc(book_id)
          .collection(COLLECTION_NAMES.notes)
          .doc(id)
          .onSnapshot(snapshot => {
            const {note, page} = snapshot.data();
            if (undefined !== note) {
              setValue('note', note);
              setValue('page', page.toString());
            }
            setLoading(false);
            __showSaveButton();
          });
      });
    }
  };

  const _onSuccess = msg => {
    _showToastMsg(msg);
    setSaving(false);
    if (!edit) {
      navigation.navigate(ROUTES_NAME.notes);
    }
  };

  const __onErrorSaving = () => {
    _alertError();
    setSaving(false);
  };

  const onSubmit = data => {
    setSaving(true);
    const {note, page} = data;
    const p = undefined !== page && page !== '' ? Number(page) : '';
    const n = limitStr(note);
    getObjData('user', e => _alertError())
      .then(u => {
        if (selectedBook !== null) {
          if (edit) {
            note.book_name = selectedBook._data.title;
            firestore()
              .collection('users')
              .doc(u.uid)
              .collection(COLLECTION_NAMES.books)
              .doc(selectedBook.id)
              .collection(COLLECTION_NAMES.notes)
              .update({
                note: note,
              })
              .then(() => _onSuccess(`${n} updated`))
              .catch(error => __onErrorSaving());
          } else {
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
                book_name: selectedBook._data.title,
                status: ItemStatus.active,
                page: p,
              })
              .then(() => _onSuccess(`${n} added`))
              .catch(error => __onErrorSaving());
          }
        } else {
          _showToastMsg('Please select a book first');
          setSaving(false);
        }
      })
      .catch(error => __onErrorSaving());
  };

  const HeaderRight = () => (
    <SubmitButton
      title="SAVE"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      progress={saving}
      showProgressIndicator={true}
      isLoadingText="Saving"
      variant="unstyled"
      m={0}
      px={0}
      py={0}
    />
  );

  useEffect(() => {
    __getNote();
    if (!edit) {
      __showSaveButton();
      setLoading(false);
    }
    return () => {};
  }, [selectedBook]);

  if (loading) {
    return <AppActivityIndicator />;
  }

  return (
    <Screen>
      <ScrollView>
        <NoteForm
          control={control}
          errors={errors}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      </ScrollView>
    </Screen>
  );
};

export default React.memo(AddEditNoteScreen);
