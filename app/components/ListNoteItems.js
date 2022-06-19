import {useDisclose, Text, Box, Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

import {
  ActionSheet,
  AppFab,
  NoteForm,
  NoteItem,
  ListTitle,
  Screen,
  VList,
} from '.';
import {NoteSchema} from '../validation/Validations';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {useRef} from 'react';
import {useAlertError, useLoadNotes, useShowMessage} from '../hooks';
import SelectBookOptions from './SelectBookOptions';
import {getObjData} from '../data/AsyncStorageUtils';

const AS_STATUS = {
  add_edit: 'EDIT_ADD_AS',
  delete: 'DELETE_note_AS',
  select_book: 'SELECT_BOOK_AS',
};

const ListNoteItems = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [currentId, setCurrentId] = useState(null);
  const [edit, setEdit] = useState(false);
  const addEditAS = useRef();
  const [currentAS, setCurrentAS] = useState(null);
  const [noteToDelete, setnoteToDelete] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const {
    notes,
    loading,
    refreshing,
    _loadNotes,
    _onRefresh,
    subscriber,
    dataSubscriber,
  } = useLoadNotes();
  const {_alertError} = useAlertError();
  const {_showToastMsg} = useShowMessage();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      note: '',
    },
    resolver: yupResolver(NoteSchema),
  });

  useEffect(() => {
    _loadNotes();
    return () => {
      subscriber;
      dataSubscriber;
    };
  });

  const _onSuccess = msg => {
    _onClose();
    _showToastMsg(msg);
  };

  const _editnote = item => {
    if (undefined !== item) {
      const {
        _data: {note},
        id,
      } = item;
      if (undefined !== note) {
        setValue('note', note);
        setCurrentId(id);
        setEdit(true);
        setSelectedBook(item);
        _openSelectBook();
      }
    }
  };

  const _openSelectBook = () => {
    setCurrentAS(AS_STATUS.select_book);
    onOpen();
  };

  const _onDotPress = item => {
    setnoteToDelete(item);
    setCurrentAS(AS_STATUS.delete);
    onOpen();
  };

  const _onClose = () => {
    onClose();
    setEdit(false);
    setCurrentId(null);
    setnoteToDelete(null);
    reset();
    setCurrentAS(null);
    setSelectedBook(null);
  };

  const _onDeletePress = () => {
    if (noteToDelete !== null) {
      const {
        _data: {note},
        id,
      } = noteToDelete;
      getObjData('user', e => _alertError())
        .then(u => {
          firestore()
            .collection('users')
            .doc(u.uid)
            .collection(COLLECTION_NAMES.books)
            .doc(selectedBook.id)
            .collection(COLLECTION_NAMES.notes)
            .doc(id)
            .delete()
            .then(() => _onSuccess(`note ${note} deleted`))
            .catch(error => _alertError());
        })
        .catch(e => _alertError());
    }
  };

  return (
    <Screen style={styles.container}>
      <VList
        onRefresh={_onRefresh}
        refreshing={refreshing}
        data={notes}
        renderItem={({item}) => (
          <NoteItem
            item={item}
            onEditPress={() => _editnote(item)}
            onDotPress={() => _onDotPress(item)}
          />
        )}
        ListHeaderComponent={<ListTitle title="My notes" />}
        loading={loading}
      />
      <AppFab onPress={_openSelectBook} />
      {noteToDelete !== null && currentAS === AS_STATUS.delete && (
        <ActionSheet isOpen={isOpen} onClose={_onClose}>
          <Text mt={4} fontSize="md">
            {noteToDelete._data !== null
              ? `note ${noteToDelete._data.note} will be deleted. Do you want to procced ?`
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
      )}
      {currentAS !== null && currentAS === AS_STATUS.select_book && (
        <ActionSheet isOpen={isOpen} onClose={_onClose} reference={addEditAS}>
          <Box flexDirection="column">
            <SelectBookOptions
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
            <NoteForm
              edit={edit}
              control={control}
              currentId={currentId}
              errors={errors}
              handleSubmit={handleSubmit}
              onSuccess={_onSuccess}
              selectedBook={selectedBook}
              alertError={_alertError}
            />
          </Box>
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

export default React.memo(ListNoteItems);
