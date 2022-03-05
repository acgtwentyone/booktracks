import {
  useDisclose,
  FormControl,
  useToast,
  Text,
  Box,
  Button,
  FlatList,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
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
  AppActivityIndicator,
} from '.';
import {PageSchema} from '../validation/Validations';
import {ItemStatus} from '../realm/Schemas';
import {
  add,
  COLLECTION_NAMES,
  remove,
  serTimestamp,
  update,
} from '../firebase/FirebaseUtils';
import {useRef} from 'react';

const AS_STATUS = {
  add_edit: 'EDIT_ADD_AS',
  delete: 'DELETE_PAGE_AS',
  select_book: 'SELECT_BOOK_AS',
};

const ListPageItems = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();
  const addEditAS = useRef();
  const [currentAS, setCurrentAS] = useState(null);
  const [pageToDelete, setPageToDelete] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const path = COLLECTION_NAMES.pages;

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
    const subscriber = _loadPages();
    return () => subscriber();
  }, []);

  const _loadPages = () => {
    let subscriber = firestore().collection(path);
    subscriber = subscriber.onSnapshot(querySnapshot => {
      const _pages = [];
      querySnapshot.forEach(documentSnapshot => {
        _pages.push(documentSnapshot);
      });
      setPages(_pages);
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
        console.log(selectedBook);
        add(
          {
            id: uuid(),
            page: page,
            obs: obs,
            created_at: serTimestamp,
            updated_at: serTimestamp,
            book_id: selectedBook,
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
        setCurrentAS(AS_STATUS.add_edit);
        onOpen();
      }
    }
  };

  const _onRefresh = () => {
    _loadPages();
  };

  const _openAddEditAS = () => {
    setCurrentAS(AS_STATUS.add_edit);
    onOpen();
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

  const RenderSelectBookOptions = ({onBookPress}) => {
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [books, setBooks] = useState([]);
    const [refreshingBooks, setRefreshingBooks] = useState(false);

    const _loadBooks = () => {
      let subscriber = firestore().collection(COLLECTION_NAMES.books);
      subscriber = subscriber.onSnapshot(querySnapshot => {
        const _books = [];
        querySnapshot.forEach(documentSnapshot => {
          _books.push(documentSnapshot);
        });
        setBooks(_books);
        setLoadingBooks(false);
      });

      return subscriber;
    };

    useEffect(() => {
      let subscriber = _loadBooks();
      return subscriber;
    }, []);

    const BookItem = ({item}) => {
      return undefined !== item && item !== null ? (
        <TouchableOpacity onPress={() => onBookPress(item.id)}>
          <Box
            p={5}
            m={2}
            _dark={{background: 'coolGray.600'}}
            _light={{background: 'coolGray.200'}}
            flexDirection="column"
            alignItems="center">
            <Text fontWeight="bold">
              {item._data.author.length > 16
                ? `${item._data.author.substring(0, 15)}...`
                : item._data.author}
            </Text>
            <Text>
              {item._data.title.length > 16
                ? `${item._data.title.substring(0, 15)}...`
                : item._data.title}
            </Text>
          </Box>
        </TouchableOpacity>
      ) : (
        <></>
      );
    };

    const _onRefreshBooks = () => {
      _loadBooks();
    };

    if (loadingBooks) {
      return <AppActivityIndicator />;
    }

    return (
      <Box flexDirection="column" p={0}>
        <ListTitle title="Select a book" />
        <FlatList
          horizontal
          onRefresh={_onRefreshBooks}
          refreshing={refreshingBooks}
          data={books}
          renderItem={({item}) => <BookItem item={item} />}
        />
      </Box>
    );
  };

  const _onBookSelected = item => {
    console.log(`book id is ${item}`);
    setSelectedBook(item);
    _onClose();
    _openAddEditAS();
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
      {currentAS !== null && currentAS === AS_STATUS.add_edit && (
        <ActionSheet isOpen={isOpen} onClose={_onClose} reference={addEditAS}>
          <RenderForm />
        </ActionSheet>
      )}
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
          <RenderSelectBookOptions
            onBookPress={item => _onBookSelected(item)}
          />
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
