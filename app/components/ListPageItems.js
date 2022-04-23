import {
  useDisclose,
  FormControl,
  useToast,
  Text,
  Box,
  Button,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {uuid} from '../Utils';

import {
  ActionSheet,
  AppFab,
  AppInput,
  PageItem,
  ListTitle,
  Screen,
  SubmitButton,
  VList,
} from '.';
import {PageSchema} from '../validation/Validations';
import {
  add,
  COLLECTION_NAMES,
  remove,
  serTimestamp,
  update,
  ItemStatus,
} from '../firebase/FirebaseUtils';
import {useRef} from 'react';
import {useLoadPages} from '../hooks';
import SelectBookOptions from './SelectBookOptions';

const AS_STATUS = {
  add_edit: 'EDIT_ADD_AS',
  delete: 'DELETE_PAGE_AS',
  select_book: 'SELECT_BOOK_AS',
};

const path = COLLECTION_NAMES.pages;

const ListPageItems = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [currentId, setCurrentId] = useState(null);
  const [edit, setEdit] = useState(false);
  const toast = useToast();
  const addEditAS = useRef();
  const [currentAS, setCurrentAS] = useState(null);
  const [pageToDelete, setPageToDelete] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const {pages, loading, refreshing, _loadPages, _onRefresh} = useLoadPages();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting, isValidating},
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      page: '',
      obs: '',
    },
    resolver: yupResolver(PageSchema),
  });

  useEffect(() => {
    _loadPages();
  }, []);

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
    const {page, obs} = data;
    if (edit) {
      update(
        {
          page: page,
          obs: obs,
        },
        path,
        currentId,
        _onSuccess(`Page ${page} updated`),
      );
    } else {
      if (selectedBook !== null) {
        add(
          {
            id: uuid(),
            page: page,
            obs: obs,
            created_at: serTimestamp,
            updated_at: serTimestamp,
            book_id: selectedBook.id,
            status: ItemStatus.active,
          },
          path,
          _onSuccess(`Page ${page} added`),
        );
      } else {
        _showToastMsg('Please select a book first');
      }
    }
  };

  const _editPage = item => {
    if (undefined !== item) {
      const {
        _data: {page, obs},
        id,
      } = item;
      if (undefined !== page && undefined !== obs) {
        setValue('page', page);
        setValue('obs', obs);
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
    setPageToDelete(item);
    setCurrentAS(AS_STATUS.delete);
    onOpen();
  };

  const _onClose = () => {
    onClose();
    setEdit(false);
    setCurrentId(null);
    setPageToDelete(null);
    reset();
    setCurrentAS(null);
    setSelectedBook(null);
  };

  const _onDeletePress = () => {
    if (pageToDelete !== null) {
      const {
        _data: {page},
        id,
      } = pageToDelete;
      remove(path, id, _onSuccess(`Page ${page} deleted`));
    }
  };

  const RenderForm = () => {
    return (
      <FormControl>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              placeholder="Page number"
              props={{keyboardType: 'numeric'}}
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="page"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              placeholder="Description"
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="obs"
        />
        <SubmitButton
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          title={edit && currentId ? 'Update Page' : 'Add Page'}
        />
      </FormControl>
    );
  };

  return (
    <Screen style={styles.container}>
      <VList
        onRefresh={_onRefresh}
        refreshing={refreshing}
        data={pages}
        renderItem={({item}) => (
          <PageItem
            item={item}
            onEditPress={() => _editPage(item)}
            onDotPress={() => _onDotPress(item)}
          />
        )}
        ListHeaderComponent={<ListTitle title="My Pages" />}
        loading={loading}
      />
      <AppFab onPress={_openSelectBook} />
      {pageToDelete !== null && currentAS === AS_STATUS.delete && (
        <ActionSheet isOpen={isOpen} onClose={_onClose}>
          <Text mt={4}>
            {pageToDelete._data !== null
              ? `Page ${pageToDelete._data.page} will be deleted. Do you want to procced ?`
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
            <RenderForm />
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

export default React.memo(ListPageItems);
