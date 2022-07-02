import {useDisclose, Button, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

import {
  ActionSheet,
  AppFab,
  BookForm,
  BookItem,
  ListTitle,
  Screen,
  VList,
} from '.';
import {BookSchema} from '../validation/Validations';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {
  useAlertError,
  useLoadBooks,
  useOnStarPress,
  useShowMessage,
} from '../hooks';
import {getObjData} from '../data/AsyncStorageUtils';
import {limitStr, ROUTES_NAME, SCREEN_WIDTH} from '../Utils';
import {useNavigation} from '@react-navigation/native';

const ListBookItems = ({isFavourities = false, subtitle}) => {
  const [itemPressed, setItemPressed] = useState(null);
  const {books, loading, refreshing, _onRefresh} = useLoadBooks(isFavourities);
  const {_alertError} = useAlertError();
  const {_showToastMsg} = useShowMessage();
  const navigation = useNavigation();

  const _onSuccess = msg => {
    _showToastMsg(msg);
  };

  const _onStarPress = ({_data: {title, favourity}, id}) => {
    getObjData('user', e => _alertError()).then(u => {
      firestore()
        .collection('users')
        .doc(u.uid)
        .collection(COLLECTION_NAMES.books)
        .doc(id)
        .update({
          favourity: !favourity,
        })
        .then(() => {
          _showToastMsg(
            `Book "${limitStr(title)}" ${
              favourity ? 'removed from' : 'added to'
            } favourity`,
          );
        })
        .catch(error => _alertError());
    });
  };

  const _onFabPress = () => {
    navigation.navigate(ROUTES_NAME.add_edit_book);
  };

  const _onItemPress = item => {
    navigation.navigate(ROUTES_NAME.book_detail, {
      id: item.id,
    });
  };

  const _onDeletePress = () => {
    console.log('on delete press');
  };

  const _onDeleteConfirmPress = () => {
    const {
      _data: {title},
      id,
    } = itemPressed;
    getObjData('user', e => _alertError())
      .then(u => {
        firestore()
          .collection(COLLECTION_NAMES.users)
          .doc(u.uid)
          .collection(COLLECTION_NAMES.books)
          .doc(id)
          .delete()
          .then(() => _onSuccess(`Book ${title} deleted`))
          .catch(error => _alertError());
      })
      .catch(e => _alertError());
  };

  const DeleteConfirmation = () => (
    <VStack>
      <Text>Note that this record can not be accessed again. Procced ?</Text>
      <Button
        mt={4}
        onPress={() => _onDeleteConfirmPress()}
        _dark={{background: 'red.500'}}
        _light={{background: 'red.100'}}>
        Delete
      </Button>
    </VStack>
  );

  return (
    <Screen style={styles.container}>
      <VList
        onRefresh={_onRefresh}
        refreshing={refreshing}
        data={books}
        renderItem={({item}) => (
          <BookItem
            item={item}
            onStarPress={() => _onStarPress(item)}
            onItemPress={() => _onItemPress(item)}
            isFavScreen={isFavourities}
            limit={SCREEN_WIDTH / 16}
          />
        )}
        ListHeaderComponent={<ListTitle title={subtitle} />}
        loading={loading}
      />
      {!isFavourities && <AppFab onPress={_onFabPress} />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListBookItems;
