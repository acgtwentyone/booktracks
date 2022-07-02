import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

import {
  AppActivityIndicator,
  AppTouchableOpacity,
  BookForm,
  Screen,
} from '../components';
import {useAlertError, useShowMessage} from '../hooks';
import {BookSchema} from '../validation/Validations';
import {uuid} from '../Utils';
import {getObjData} from '../data/AsyncStorageUtils';
import {
  COLLECTION_NAMES,
  serTimestamp,
  ItemStatus,
} from '../firebase/FirebaseUtils';

const AddEditBookScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {_showToastMsg} = useShowMessage();
  const {_alertError} = useAlertError();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      isbn: '',
      last_readed_page: '',
      description: '',
    },
    resolver: yupResolver(BookSchema),
  });

  const {edit, id} = route.params;

  const __showSaveButton = () => {
    navigation.setOptions({
      headerRight: () => <HeaderRight />,
    });
  };

  const _getBook = () => {
    if (undefined !== edit && edit) {
      setLoading(true);
      getObjData('user', e => {}).then(u => {
        firestore()
          .collection('users')
          .doc(u.uid)
          .collection(COLLECTION_NAMES.books)
          .doc(id)
          .onSnapshot(snapshot => {
            const {title, isbn, author, year, description, last_readed_page} =
              snapshot.data();
            if (
              undefined !== title &&
              undefined !== isbn &&
              undefined !== author &&
              undefined !== year &&
              undefined !== description &&
              undefined !== last_readed_page
            ) {
              setValue('author', author);
              setValue('isbn', isbn);
              setValue('title', title);
              setValue('year', year.toString());
              setValue('last_readed_page', last_readed_page.toString());
              setValue('description', description.toString());
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
  };

  const __onErrorSaving = () => {
    _alertError();
    setSaving(false);
  };

  const onSubmit = data => {
    setSaving(true);
    const {author, isbn, last_readed_page, description, title, year} = data;
    const lastReaded =
      undefined !== last_readed_page && last_readed_page !== ''
        ? Number(last_readed_page)
        : '';
    const y = undefined !== year && year !== '' ? Number(year) : '';
    const t = title.length > 25 ? `${title.substring(0, 24)}...` : `${title}`;
    getObjData('user', e => _alertError()).then(u => {
      edit
        ? firestore()
            .collection(COLLECTION_NAMES.users)
            .doc(u.uid)
            .collection(COLLECTION_NAMES.books)
            .doc(id)
            .update({
              title: title,
              author: author,
              year: y,
              isbn: isbn,
              last_readed_page: lastReaded,
              description: description,
            })
            .then(() => {
              _onSuccess(`Book ${t} updated`);
            })
            .catch(error => __onErrorSaving())
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
              description: description,
              created_at: serTimestamp,
              updated_at: serTimestamp,
              status: ItemStatus.active,
              favourity: false,
            })
            .then(() => {
              _onSuccess(`Book ${t} added`);
            })
            .catch(error => {
              __onErrorSaving();
            });
    });
  };

  const HeaderRight = () => (
    <AppTouchableOpacity onPress={handleSubmit(onSubmit)}>
      {saving ? <AppActivityIndicator m={0} /> : <Text>SAVE</Text>}
    </AppTouchableOpacity>
  );

  useEffect(() => {
    _getBook();
    if (!edit) {
      __showSaveButton();
      setLoading(false);
    }
    return () => {};
  }, []);

  if (loading) {
    return <AppActivityIndicator m={0} />;
  }

  return (
    <Screen>
      <ScrollView>
        <BookForm control={control} errors={errors} />
      </ScrollView>
    </Screen>
  );
};

export default React.memo(AddEditBookScreen);
